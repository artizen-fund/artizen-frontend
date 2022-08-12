import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CheckboxControl, Button } from '@components'
import { breakpoint, typography } from '@theme'
import WalletOptions from './WalletOptions'
import { useConnect, useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { assert, isProd, USDC_UNIT, useLoggedInUser, userMetadataVar } from '@lib'
import { ethers } from 'ethers'
import { useMutation, useReactiveVar } from '@apollo/client'
import type { MagicUserMetadata } from 'magic-sdk'
import { CREATE_TOP_UP_WALLET } from '@gql'
import { getConfirmDonationURL } from 'src/lib/confirmDonationUrl'
import usdcabiContract from 'src/contracts/USDCAbi'
import { uniqueId } from 'lodash'

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
  const metadata = useReactiveVar<MagicUserMetadata>(userMetadataVar)
  if (!metadata.publicAddress) return <></>

  const [savePaymentInfo, setSavePaymentInfo] = useState(false)

  const { connect } = useConnect()
  const { address, isConnected } = useAccount()

  const getChainId = () => {
    // 1 - Ethereum
    // 137 - Matic
    // 5 - Goerli
    // 80001 - Mumbai
    return isProd() ? (donationMethod === 'polygon' ? 137 : 1) : donationMethod === 'polygon' ? 80001 : 5
  }

  const usdcContractAddress = assert(
    process.env.NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS',
  )

  const { data, isLoading, isSuccess, write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: usdcContractAddress,
    contractInterface: usdcabiContract,
    functionName: 'transfer',
    args: [metadata?.publicAddress, ethers.utils.parseUnits(amount.toString(), USDC_UNIT).toString()],
    chainId: getChainId(),
  })

  const [createTopUpWallet] = useMutation(CREATE_TOP_UP_WALLET, {
    onError: error => {
      console.error('createTopUpWallet result    ', error)
    },
  })

  const connetWallet = (wallet: string) => {
    if (wallet === 'metamask') {
      connect({
        connector: new InjectedConnector({ chains }),
        chainId: getChainId(),
      })
    } else {
      connect({
        connector: walletConnectConnector,
        chainId: getChainId(),
      })
    }
  }

  const processTransaction = async () => {
    if (donationMethod === 'polygon') {
      write?.()
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
        <WalletOptions {...{ connetWallet }} />
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
