import { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, DonationHelpLink, Form, CheckboxControl } from '@components'
import { useLoggedInUser } from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/paymentFiatAddress'
import { countryAndRegionIsSupported } from './helpers'

interface IPaymentFiat {
  setStage: (s: DonationStage) => void
  amount: number
}

const TRANSACTION_FEE = 42

const PaymentFiat = ({ setStage, amount }: IPaymentFiat) => {
  const [loggedInUser] = useLoggedInUser()
  const LOCALSTORAGE_KEY = 'fiatPaymentAddress'
  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  // TODO: ^ where/how is this stored?
  const [paymentData, setPaymentData] = useState<FormState>(initialState)
  const [processing, setProcessing] = useState(false)

  useMemo(() => {
    if (typeof localStorage === 'undefined') {
      return
    }
    const frozenAnswers = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!frozenAnswers) {
      setPaymentData(initialState)
      return
    }
    const thawedAnswers = JSON.parse(frozenAnswers)
    setPaymentData(thawedAnswers)
  }, [])

  const proceedToPayment = async () => {
    try {
      // todo: save to Hasura
      setStage('paymentFiat')
    } catch {
      setProcessing(false)
    }
  }

  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    setDisabled(
      !paymentData.street1 ||
        !paymentData.city ||
        !paymentData.zip ||
        countryAndRegionIsSupported(paymentData.country, paymentData.state),
    )
  }, [paymentData])

  return (
    <Wrapper className={processing ? 'processing' : ''}>
      <Information>
        <div>
          <Title>We require your address because regulation stuff. TODO: rewrite this</Title>
          <DonationHelpLink />
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
      <Form
        localStorageKey={LOCALSTORAGE_KEY}
        {...{ schema, uischema, initialState }}
        readonly={processing}
        data={paymentData}
        setData={setPaymentData}
      >
        <SubmitButton stretch onClick={proceedToPayment} {...{ disabled }}>
          Payment
        </SubmitButton>
        <ProcessingMessage>hum de dooo</ProcessingMessage>
      </Form>
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

const Title = styled.h1``

const SubmitButton = styled(props => <Button {...props} />)`
  grid-area: submit;
`

const ProcessingMessage = styled.div`
  display: none;
  grid-area: processing;
`

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  grid-template-areas:
    'copy copy'
    'street1 street1'
    'city state'
    'zip countruy'
    'submit submit';
  &.submitted {
    grid-template-areas:
      'copy'
      'confirmation';
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-areas:
      'copy copy street1 street1'
      'copy copy city state'
      'copy copy zip country'
      'copy copy submit submit';
    &.submitted {
      grid-template-areas:
        'copy copy processing processing'
        'copy copy processing processing'
        'copy copy processing processing'
        'copy copy processing processing'
        'copy copy processing processing'
        'copy copy processing processing';
    }
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }

  .vertical-layout,
  .vertical-layout-item {
    display: contents;
  }

  *[id='#/properties/street1'] {
    grid-area: street1;
  }

  *[id='#/properties/city'] {
    grid-area: city;
  }

  *[id='#/properties/state'] {
    grid-area: state;
  }

  *[id='#/properties/country'] {
    grid-area: country;
  }

  *[id='#/properties/zip'] {
    grid-area: zip;
  }

  &.processing {
    *[id='#/properties/street1'],
    *[id='#/properties/city'],
    *[id='#/properties/state'],
    *[id='#/properties/country'],
    *[id='#/properties/zip'],
    ${SubmitButton} {
      display: none;
    }
    ${ProcessingMessage} {
      display: flex;
    }
  }
`

export default PaymentFiat
