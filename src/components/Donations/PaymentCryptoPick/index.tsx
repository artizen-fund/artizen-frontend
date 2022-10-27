import { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { LayoutContext, useProcessDonation } from '@lib'
import { Button, Form, DonationHelpLink, DonationSummary } from '@components'
import { breakpoint, typography } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/pickCryptoType'

const PaymentCryptoPick = () => {
  const { setDonationStage } = useContext(LayoutContext)
  const { setDonationMethod } = useProcessDonation()

  const [data, setData] = useState<FormState>(initialState)

  useEffect(
    () => setDonationMethod?.(data.donationMethod === '' ? undefined : (data.donationMethod as DonationMethod)),
    [data],
  )

  return (
    <Wrapper>
      <Information>
        <div>
          <Title>Choose your preferred cryptocurrency</Title>
          <DonationHelpLink />
        </div>
        <DonationSummary />
      </Information>
      <WalletOptions>
        <Form {...{ schema, uischema, initialState }} data={data} setData={setData} />
        <SubmitButton onClick={() => setDonationStage?.('paymentCryptoConnect')} stretch level={1}>
          Continue
        </SubmitButton>
      </WalletOptions>
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

const WalletOptions = styled.div`
  grid-area: walletOptions;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const SubmitButton = styled(props => <Button {...props} />)`
  margin-top: 15px;
`

export default PaymentCryptoPick
