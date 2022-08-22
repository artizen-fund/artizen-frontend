import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CheckboxControl } from '@components'
import { breakpoint, typography } from '@theme'
import WalletOptions from './WalletOptions'
import { useConnect, useAccount } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { getChainId, userMetadataVar } from '@lib'
import { useReactiveVar } from '@apollo/client'
interface IPaymentCrypto {
  setStage: (s: DonationStage) => void
  amount: number
  donationMethod: DonationMethod
  chains: any
}

const TRANSACTION_FEE = 42

const walletConnectConnector = new WalletConnectConnector({
  options: {
    qrcode: true,
  },
})

const PaymentCrypto = ({ setStage, amount, donationMethod, chains }: IPaymentCrypto) => {
  const metadata = useReactiveVar<any>(userMetadataVar)
  if (!metadata.publicAddress) return <></>

  const [savePaymentInfo, setSavePaymentInfo] = useState(false)

  const { connect } = useConnect()
  const { isConnected } = useAccount()
  const chainId = getChainId(donationMethod)

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

  useEffect(() => {
    if (isConnected) {
      setStage('processCrypto')
    }
  }, [isConnected])

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
      {!isConnected && <WalletOptions {...{ connectWallet }} />}
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
