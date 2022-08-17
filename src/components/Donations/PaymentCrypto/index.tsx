import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CheckboxControl, Button } from '@components'
import { breakpoint, typography } from '@theme'
import WalletOptions from './WalletOptions'
import { useConnect, useAccount, useContractWrite, useSigner, useSwitchNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { assert, getChainId, isProd, sleep, USDC_UNIT, useLoggedInUser, userMetadataVar } from '@lib'
import { ethers } from 'ethers'
import { useMutation, useReactiveVar } from '@apollo/client'
import { CREATE_SWAP, CREATE_TOP_UP_WALLET } from '@gql'
import { getConfirmDonationURL } from 'src/lib/confirmDonationUrl'
import usdcabiContract from 'src/contracts/USDCAbi'
import { uniqueId } from 'lodash'
import qs from 'qs'
interface IPaymentCrypto {
  setStage: (s: DonationStage) => void
  amount: number
  donationMethod: DonationMethod
  chains: any
  setOrder: (o: { id: string }) => void
}

const TRANSACTION_FEE = 42

const walletConnectConnector = new WalletConnectConnector({
  options: {
    qrcode: true,
  },
})

const PaymentCrypto = ({ setStage, amount, donationMethod, chains, setOrder }: IPaymentCrypto) => {
  const [loggedInUser] = useLoggedInUser()
  const metadata = useReactiveVar<any>(userMetadataVar)
  if (!metadata.publicAddress) return <></>

  const [savePaymentInfo, setSavePaymentInfo] = useState(false)

  const { connect } = useConnect()
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()
  const { switchNetwork } = useSwitchNetwork()

  const usdcContractAddress = assert(
    process.env.NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS',
  )

  const chainId = getChainId(donationMethod)
  const amountInUSDCDecimals = ethers.utils.parseUnits(amount.toString(), USDC_UNIT).toString()

  const {
    data,
    isLoading,
    isSuccess,
    write: transferUSDC,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: usdcContractAddress,
    contractInterface: usdcabiContract,
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

  const connectWallet = (wallet: string) => {
    if (wallet === 'metamask') {
      connect({
        connector: new InjectedConnector({ chains }),
        chainId,
      })
    } else {
      connect({
        connector: walletConnectConnector,
        chainId,
      })
    }
  }

  const processTransaction = async () => {
    if (donationMethod === 'polygon') {
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

      // Change to Goerli for testing
      if (!isProd()) {
        switchNetwork?.(5)
        await sleep(15000)
      }

      setStage('processCrypto')
    }
  }

  const handleSuccess = async () => {
    const orderId = uniqueId()
    await createTopUpWallet({
      variables: {
        data: {
          userId: loggedInUser?.id,
          amount,
          originFund: donationMethod,
          state: 'INITIATED',
          timestamp: new Date().getTime(),
          fee: 0,
          txHash: data?.hash,
          url: getConfirmDonationURL(),
          orderId,
        },
      },
    })

    setOrder({ id: orderId })
    setStage('processCrypto')
  }

  useEffect(() => {
    if (isSuccess) {
      handleSuccess()
    }
  }, [isSuccess])

  return (
    <Wrapper>
      <Information>
        <div>
          <Title>Let’s connect your wallet and double check the Ethereum balance</Title>
          <Subhead>
            Web3 takes longer to process transactions than traditional methods. But don’t worry we’ll keep guiding you
            through the process.
          </Subhead>
        </div>

        <div>
          <p>Donation Summary</p>
          <ul>
            <li>Donation: ${amount}</li>
            <li>Transaction fee: ${TRANSACTION_FEE}</li>
            <li>Purchase total: ${amount + TRANSACTION_FEE}</li>
          </ul>
        </div>

        <CheckboxControl
          data={savePaymentInfo}
          handleChange={() => setSavePaymentInfo(!savePaymentInfo)}
          label="Save payment information for next time."
          path="derp"
        />
      </Information>
      {!isConnected ? (
        <WalletOptions {...{ connectWallet }} />
      ) : (
        <>
          <label>Your connected address is: {address}</label>
          <Button onClick={processTransaction}>Proceed</Button>
        </>
      )}
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
    'walletOptions';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'copy walletOptions';
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }
`

export default PaymentCrypto
