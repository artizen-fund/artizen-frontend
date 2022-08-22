import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconStack, Icon } from '@components'
import { breakpoint, typography } from '@theme'
import { ICourierMessage, useCourier } from '@trycourier/react-provider'
import { CREATE_SWAP, CREATE_TOP_UP_WALLET, GET_TOP_UP_WALLET_VIA_TRANSFER_ID } from '@gql'
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client'
import {
  assert,
  getChainId,
  isProd,
  sleep,
  USDC_UNIT,
  useBridge,
  useLoggedInUser,
  userMetadataVar,
  getConfirmDonationURL,
  getWagmiClient,
} from '@lib'
import { useDonation } from '../../../lib/useDonation'
import { useAccount, useContractWrite, useSigner, useSwitchNetwork, WagmiConfig } from 'wagmi'
import { ethers } from 'ethers'
import { v4 as uuidv4 } from 'uuid'
import { USDCAbi } from '@contracts'
import qs from 'qs'

interface IProcessCrypto {
  setStage: (s: DonationStage) => void
  donationMethod: DonationMethod
  order: { id: string }
  amount: number
  setOrder: (o: { id: string }) => void
}

type CryptoStage = 'swapping' | 'bridging' | 'building' | 'confirming' | 'complete'

const ProcessCrypto = ({ setStage, donationMethod, amount, order, setOrder }: IProcessCrypto) => {
  const [cryptoStage, setCryptoStage] = useState<CryptoStage>(donationMethod === 'ethereum' ? 'swapping' : 'building')

  const [loggedInUser] = useLoggedInUser()

  const metadata = useReactiveVar(userMetadataVar)

  const courier = useCourier()
  const [initDonation, buildingStatus, buildingMessage, confirmingStatus, confirmingMessage] = useDonation()
  const { address } = useAccount()
  const { data: signer, refetch } = useSigner()
  const { switchNetworkAsync } = useSwitchNetwork()

  const { bridge, fundsTransfered } = useBridge()

  const usdcContractAddress = assert(
    process.env.NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS',
  )
  const chainId = getChainId(donationMethod)
  const amountInUSDCDecimals = ethers.utils.parseUnits(amount.toString(), USDC_UNIT).toString()

  const {
    data: transferUSDCdata,
    isSuccess: hasTrasnferedUSDC,
    write: transferUSDC,
    isLoading: isTransferInitLoading,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: usdcContractAddress,
    contractInterface: USDCAbi,
    functionName: 'transfer',
    args: [metadata?.publicAddress, amountInUSDCDecimals],
    chainId,
  })

  const [createTopUpWallet] = useMutation(CREATE_TOP_UP_WALLET, {
    onError: error => {
      console.error('createTopUpWallet result    ', error)
    },
  })

  const [createSwap] = useMutation(CREATE_SWAP, {
    onError: error => {
      console.error('createSwap result    ', error)
    },
  })

  const [fetchTopUpWallet] = useLazyQuery(GET_TOP_UP_WALLET_VIA_TRANSFER_ID, {
    variables: {
      attr: {
        orderId: { _eq: order.id },
      },
    },
    onCompleted: async (topUpWalletData: { TopUpWallet: string | any[] }) => {
      if (topUpWalletData.TopUpWallet.length > 0) {
        const { id, amount, fee } = topUpWalletData.TopUpWallet[0]
        setCryptoStage('confirming')
        await initDonation(amount, donationMethod, fee, id)
      }
    },
  })

  const handleTopUpComplete = async () => {
    setCryptoStage('building')
    fetchTopUpWallet()
  }

  const handleSwapComplete = async () => {
    setCryptoStage('bridging')
    // Change to Goerli for testing
    let refreshedSigner = signer
    if (!isProd()) {
      await switchNetworkAsync?.(5)
      refreshedSigner = await (await refetch()).data
    }
    const amountInUSDCDecimals = ethers.utils.parseUnits(amount.toString(), USDC_UNIT).toString()
    await bridge(address, refreshedSigner?.provider, metadata?.publicAddress!, amountInUSDCDecimals)
  }

  const processTransaction = async () => {
    if (donationMethod === 'polygon' && !isTransferInitLoading) {
      transferUSDC?.()
    } else {
      const baseURL0x = assert(process.env.NEXT_PUBLIC_0X_BASE_URL, 'NEXT_PUBLIC_0X_BASE_URL')
      const params = {
        buyToken: 'USDC',
        sellToken: 'ETH',
        buyAmount: amountInUSDCDecimals,
        takerAddress: address,
      }

      const response = await fetch(`${baseURL0x}/swap/v1/quote?${qs.stringify(params)}`)
      const json = await response.json()
      json.from = address

      const tx = {
        from: address,
        to: json.to,
        value: json.value,
        data: json.data,
      }

      const swapTransaction = await signer?.sendTransaction(tx)

      await createSwap({
        variables: {
          data: {
            state: 'INITIATED',
            amount: amountInUSDCDecimals,
            userId: loggedInUser?.id,
            txHash: swapTransaction?.hash,
          },
        },
      })
    }
  }

  const createTopUpOrder = async (txHash: string) => {
    const orderId = uuidv4()
    await createTopUpWallet({
      variables: {
        data: {
          userId: loggedInUser?.id,
          amount,
          originFund: donationMethod,
          state: 'INITIATED',
          timestamp: new Date().getTime(),
          fee: 0,
          txHash,
          url: getConfirmDonationURL(),
          orderId,
        },
      },
    })

    setOrder({ id: orderId })
  }

  useEffect(() => {
    if (hasTrasnferedUSDC && transferUSDCdata?.hash) {
      createTopUpOrder(transferUSDCdata?.hash)
    }
  }, [hasTrasnferedUSDC])

  useEffect(() => {
    if (signer && donationMethod !== 'usd' && cryptoStage !== 'bridging') {
      processTransaction()
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [signer])

  useEffect(() => {
    courier.transport.intercept((message: ICourierMessage) => {
      switch (message.title) {
        case 'Payment is COMPLETE':
          handleTopUpComplete()
          break
        case 'Swap is COMPLETE':
          handleSwapComplete()
          break
        default:
          console.error('Ignoring message from courier', message.title)
          break
      }
    })
  }, [])

  const handleComplete = async () => {
    setCryptoStage('complete')
    await sleep(3000)
    setStage('confirmation')
  }
  useEffect(() => {
    if (confirmingStatus === 'COMPLETE') {
      handleComplete()
    }
  }, [confirmingStatus])

  useEffect(() => {
    if (fundsTransfered && fundsTransfered.statusCode === 2) {
      createTopUpOrder(fundsTransfered.exitHash)
    }
  }, [fundsTransfered])

  return (
    <Wrapper>
      <Information>
        <div>
          <Title>It’s time to create your donation which requires a little extra magic</Title>
          <Subhead>
            Web3 takes longer to process transactions than traditional methods. You can keep this window open or close
            it without losing any progress – we&apos;ll send you an email when we’re ready.
          </Subhead>
        </div>

        <IconStack>
          {donationMethod === 'ethereum' && (
            <>
              <li>
                <Icon outline={cryptoStage !== 'swapping'} glyph="swap" label="12% — Exchanging to USDC (est. 2m)" />
              </li>
              <li>
                <Icon outline={cryptoStage !== 'bridging'} glyph="intersect" label="Bridging blockchains (est. 2m)" />
              </li>
            </>
          )}

          {donationMethod !== 'ethereum' && (
            <li>
              <Icon outline={cryptoStage !== 'building'} glyph="refresh" label="Building your donation (est. 10m)" />
            </li>
          )}
          <li>
            <Icon outline={cryptoStage !== 'confirming'} glyph="tick" label="Confirming your donation (est. 2m)" />
          </li>
          <li>
            <Icon outline={cryptoStage !== 'complete'} glyph="party" label="Donation Complete" />
          </li>
        </IconStack>
      </Information>

      <Distractions />
    </Wrapper>
  )
}

const Information = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: copy;
`

const Title = styled.h1`
  ${typography.title.l2}
`

const Subhead = styled.h2`
  ${typography.body.l2}
`

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'copy'
    'distractions';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'copy distractions';
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }
`

const Distractions = styled.article`
  grid-area: distractions;
`

const ProcessCryptoWithWagmi = (props: any) => (
  <WagmiConfig client={getWagmiClient()}>
    <ProcessCrypto {...props} />
  </WagmiConfig>
)

export default ProcessCryptoWithWagmi
