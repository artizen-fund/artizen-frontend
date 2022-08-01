import { useState } from 'react'
import styled from 'styled-components'
import { CheckboxControl } from '@components'
import { breakpoint, typography } from '@theme'
import WalletOptions from './WalletOptions'

interface IPaymentCrypto {
  setStage: (s: DonationStage) => void
  amount: number
}

const TRANSACTION_FEE = 42

const PaymentCrypto = ({ setStage, amount }: IPaymentCrypto) => {
  const [savePaymentInfo, setSavePaymentInfo] = useState(false)

  const processTransaction = async () => setStage('processCrypto')

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

      <WalletOptions {...{ processTransaction }} />
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
