import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import { Button, DonationHelpLink, Form, CheckboxControl } from '@components'
import { payWithFiat, userMetadataVar, useLoggedInUser } from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/paymentFiat'

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

  const processTransaction = async () => {
    if (!loggedInUser) {
      return
    }
    setProcessing(true)
    try {
      setStage('paymentFiat')
    } catch {
      setProcessing(false)
    }
  }

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
        <SubmitButton stretch onClick={processTransaction}>
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
    'first_name last_name'
    'number number'
    'month year'
    'zip verification_value'
    'phone_number phone_number'
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
      'copy copy first_name last_name'
      'copy copy number number'
      'copy copy month year'
      'copy copy zip verification_value'
      'copy copy phone_number phone_number'
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

  *[id='#/properties/first_name'] {
    grid-area: first_name;
  }

  *[id='#/properties/last_name'] {
    grid-area: last_name;
  }

  *[id='#/properties/number'] {
    grid-area: number;
  }

  *[id='#/properties/verification_value'] {
    grid-area: verification_value;
  }

  *[id='#/properties/month'] {
    grid-area: month;
  }

  *[id='#/properties/year'] {
    grid-area: year;
  }

  *[id='#/properties/zip'] {
    grid-area: zip;
  }

  *[id='#/properties/phone_number'] {
    grid-area: phone_number;
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
