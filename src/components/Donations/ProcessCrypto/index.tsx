import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { ICourierMessage, useCourier } from '@trycourier/react-provider'
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client'
import { useAccount, useContractWrite, useSigner, useSwitchNetwork } from 'wagmi'
import { ethers } from 'ethers'
import qs from 'qs'
import { v4 as uuidv4 } from 'uuid'
import { CREATE_SWAP, CREATE_TOP_UP_WALLET, GET_TOP_UP_WALLET_VIA_TRANSFER_ID } from '@gql'
import { USDCAbi } from '@contracts'
import { IconStack, Icon, Button } from '@components'
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
  DonationContext,
  rgba,
} from '@lib'
import { useDonation } from '../../../lib/useDonation'
import { breakpoint, typography, palette } from '@theme'

interface IProcessCrypto {
  donationMethod: DonationMethod
  order: { id: string }
  amount: number
  setOrder: (o: { id: string }) => void
}

type CryptoStage = 'swapping' | 'bridging' | 'building' | 'confirming' | 'complete'

type Error = 'Payment Failed' | 'Transaction Rejected' | 'Donation could not complete' | ''

const ProcessCrypto = ({ donationMethod, amount, order, setOrder }: IProcessCrypto) => {
  /*

  const { setDonationStage } = useContext(DonationContext)
  const [cryptoStage, setCryptoStage] = useState<CryptoStage>(donationMethod === 'ethereum' ? 'swapping' : 'building')
  const [error, setError] = useState<Error>('')

  const [loggedInUser] = useLoggedInUser()

  const metadata = useReactiveVar(userMetadataVar)

  const courier = useCourier()
  const [initDonation, buildingStatus, buildingMessage, confirmingStatus, confirmingMessage] = useDonation()
  const { address, isConnected } = useAccount()
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
    writeAsync: transferUSDC,
    isLoading: isTransferInitLoading,
    isError: isTransferUSDCError,
    error: transferUSDCError,
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
        try {
          await initDonation(amount, donationMethod, fee, id)
        } catch (error) {
          console.error('Donation Error: ', error)
          setError('Donation could not complete')
        }
      }
    },
  })

  const handleTopUpFailed = async () => {
    setError('Payment Failed')
  }

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
    try {
      await bridge(address, refreshedSigner?.provider, metadata?.publicAddress!, amountInUSDCDecimals)
    } catch (error) {
      console.error('Bridging Error: ', error)
      setError('Transaction Rejected')
    }
  }

  const processTransaction = async () => {
    if (donationMethod === 'polygon' && !isTransferInitLoading) {
      await transferUSDC?.()
    } else {
      try {
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
      } catch (error) {
        console.error('Swapping Error: ', error)
        setError('Transaction Rejected')
      }
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
    if (signer && donationMethod !== 'usd' && cryptoStage !== 'bridging' && isConnected) {
      processTransaction()
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [signer, isConnected])

  useEffect(() => {
    if (isTransferUSDCError) {
      console.error('USDC Transfer Error: ', transferUSDCError)
      setError('Transaction Rejected')
    }
  }, [isTransferUSDCError])

  useEffect(() => {
    courier.transport.intercept((message: ICourierMessage) => {
      switch (message.title) {
        case 'Payment is COMPLETE':
          handleTopUpComplete()
          break
        case 'Payment is FAILED':
          handleTopUpFailed()
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
    setDonationStage?.('confirmation')
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

  const handleBuildingDonationRetry = async () => {
    switch (donationMethod) {
      case 'ethereum':
        await handleSwapComplete()
        break
      case 'usd':
      case 'polygon':
      default:
        setDonationStage?.('payment')
        break
    }
  }

  const retry = async () => {
    setError('')
    switch (cryptoStage) {
      case 'swapping':
        setDonationStage?.('payment')
        break
      case 'bridging':
        await handleSwapComplete()
        break
      case 'building':
        await handleBuildingDonationRetry()
        break
      case 'confirming':
        await fetchTopUpWallet()
        break
      default:
        setDonationStage?.('payment')
        break
    }
  }

*/

  const error = false
  const cryptoStage = 'swapping'
  const retry = () => alert('derp')

  return (
    <Wrapper>
      <Information>
        {!error ? (
          <div>
            <Title>It’s time to create your donation which requires a little extra magic</Title>
            <Subhead>
              Web3 takes longer to process transactions than traditional methods. You can keep this window open –
              we&apos;ll send you an email when it is completed.
            </Subhead>
          </div>
        ) : (
          <div>
            <Title>Uh oh, looks like something went wrong</Title>
            <Subhead>
              Don&apos;t worry you haven&apos;t been charged! Unfortunately Web3 is still in it&apos;s infancy and
              unusual issues can pop up from time-to-time.
            </Subhead>
          </div>
        )}

        <IconStack>
          {donationMethod === 'ethereum' && (
            <>
              <li>
                <Icon
                  outline={cryptoStage !== 'swapping'}
                  glyph="swap"
                  label="12% — Exchanging to USDC (est. 2m)"
                  error={error ? true : false}
                />
              </li>
              <li>
                <Icon
                  outline={cryptoStage !== 'bridging'}
                  glyph="intersect"
                  label="Bridging blockchains (est. 2m)"
                  error={error ? true : false}
                />
              </li>
            </>
          )}

          {donationMethod !== 'ethereum' && (
            <li>
              <Icon
                outline={cryptoStage !== 'building'}
                glyph="refresh"
                label="Building your donation (est. 10m)"
                error={error ? true : false}
              />
            </li>
          )}
          <li>
            <Icon
              outline={cryptoStage !== 'confirming'}
              glyph="tick"
              label="Confirming your donation (est. 2m)"
              error={error ? true : false}
            />
          </li>
          <li>
            <Icon
              outline={cryptoStage !== 'complete'}
              glyph="party"
              label="Donation Complete"
              error={error ? true : false}
            />
          </li>
        </IconStack>
      </Information>

      <Distractions>
        {error && (
          <div>
            <Label>{error}</Label>
            <Button onClick={retry}>Retry</Button>
          </div>
        )}
      </Distractions>
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
  justify-items: start;
  align-items: center;
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

const Label = styled.div`
  font-size: 16px;
  line-height: 23px;
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
`

export default ProcessCrypto
