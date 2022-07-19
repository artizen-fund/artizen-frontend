import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Icon, Form, CheckboxControl } from '@components'
import { rgba } from '@lib'
import { breakpoint, typography, palette } from '@theme'
import { schema, uischema, initialState, FormState } from './form'

interface IPaymentFiat {
  setStage: (s: DonationStage) => void
  amount: number
}

const TRANSACTION_FEE = 42

const PaymentFiat = ({ setStage, amount }: IPaymentFiat) => {
  const LOCALSTORAGE_KEY = 'fiatPayment'
  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  // todo: where/how is this stored?

  const [data, setData] = useState<FormState>(initialState)
  const [processing, setProcessing] = useState(false)
  const [readonly, setReadonly] = useState(false)

  useMemo(() => {
    if (typeof localStorage === 'undefined') {
      return
    }
    const frozenAnswers = localStorage.getItem(LOCALSTORAGE_KEY)
    if (!frozenAnswers) {
      setData(initialState)
      return
    }
    const thawedAnswers = JSON.parse(frozenAnswers)
    setData(thawedAnswers)
  }, [])

  const processTransation = () => {
    setReadonly(true)
    setProcessing(true)
    console.warn('processing form data', data)
    // todo: stuff
    // then
    setTimeout(() => setStage('processCrypto'), 5000)
  }

  return (
    <Wrapper className={processing ? 'processing' : ''}>
      <Information>
        <div>
          <Title>Let’s enter your payment information</Title>
          <InfoLine>
            <Icon outline glyph="info" level={2} />
            <span>Need help? We’ve prepared a useful guide to donating.</span>
          </InfoLine>
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
      <Form localStorageKey={LOCALSTORAGE_KEY} {...{ schema, uischema, initialState, data, setData, readonly }}>
        <SubmitButton stretch onClick={() => processTransation()}>
          Transfer ${amount + TRANSACTION_FEE}
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

const InfoLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`

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
    'firstName lastName'
    'cardNumber cardNumber'
    'expiresMonth expiresYear'
    'postalCode cvv'
    'phone phone'
    'submit submit';
  &.submitted {
    grid-template-areas:
      'copy'
      'optIn'
      'confirmation';
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-areas:
      'copy copy firstName lastName'
      'copy copy cardNumber cardNumber'
      'copy copy expiresMonth expiresYear'
      'copy copy postalCode cvv'
      'copy copy phone phone'
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

  *[id='#/properties/firstName'] {
    grid-area: firstName;
  }

  *[id='#/properties/lastName'] {
    grid-area: lastName;
  }

  *[id='#/properties/cardNumber'] {
    grid-area: cardNumber;
  }

  *[id='#/properties/cvv'] {
    grid-area: cvv;
  }

  *[id='#/properties/expiresMonth'] {
    grid-area: expiresMonth;
  }

  *[id='#/properties/expiresYear'] {
    grid-area: expiresYear;
  }

  *[id='#/properties/postalCode'] {
    grid-area: postalCode;
  }

  *[id='#/properties/phone'] {
    grid-area: phone;
  }

  &.processing {
    *[id='#/properties/EMAIL'],
    *[id='#/properties/FNAME'],
    *[id='#/properties/LNAME'],
    ${SubmitButton} {
      display: none;
    }
    ${ProcessingMessage} {
      display: flex;
    }
  }
`

export default PaymentFiat
