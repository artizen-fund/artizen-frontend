import { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import { Button, DonationHelpLink, Form, CheckboxControl } from '@components'
import { payWithFiat, userMetadataVar, useLoggedInUser, calculateFee } from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/paymentFiat'

interface IPaymentFiat {
  setStage: (s: DonationStage) => void
  amount: number
}

type FormStage = 'gatheringPersonal' | 'gatheringPayment' | 'processing'

const PaymentFiat = ({ setStage, amount }: IPaymentFiat) => {
  const [loggedInUser] = useLoggedInUser()
  const [formStage, setFormStage] = useState<FormStage>('gatheringPersonal')

  const LOCALSTORAGE_KEY = 'fiatPayment'
  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  const [paymentData, setPaymentData] = useState<FormState>(initialState)

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

  const metadata = useReactiveVar(userMetadataVar)

  const processTransaction = async () => {
    if (!loggedInUser) {
      return
    }
    setFormStage('processing')
    try {
      await payWithFiat(amount, paymentData, loggedInUser, metadata)
      setStage('processCrypto')
    } catch {
      setFormStage('gatheringPersonal')
    }
  }

  const [transactionFee, setTransactionFee] = useState<number>()
  useEffect(() => {
    if (!paymentData.country) return
    setTransactionFee(calculateFee(amount, paymentData.country as string))
  }, [paymentData])

  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    console.log('paymentData', paymentData, uischema)
    const supportedRegion = (paymentData.country, paymentData.state)
    setDisabled(formStage === 'processing' || !transactionFee || !supportedRegion)
  }, [formStage, transactionFee, paymentData])

  return (
    <Wrapper className={formStage}>
      <Information>
        <div>
          <Title>Let’s enter your payment information</Title>
          <DonationHelpLink />
        </div>

        <div>
          <p>Donation Summary</p>
          <ul>
            <li>Donation: ${amount}</li>
            <li>Transaction fee: {!!transactionFee ? 'checking' : `$${transactionFee}`}</li>
            <li>Purchase total: {!!transactionFee ? 'checking' : `$${amount + transactionFee!}`}</li>
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
        readonly={formStage === 'processing'}
        data={paymentData}
        setData={setPaymentData}
      >
        <GatherPaymentButton stretch onClick={() => setFormStage('gatheringPayment')}>
          Payment Info
        </GatherPaymentButton>
        <SubmitButton stretch onClick={processTransaction} {...{ disabled }}>
          Transfer donation
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
  grid-area: submitButton;
`

const GatherPaymentButton = styled(props => <Button {...props} />)`
  grid-area: gatherPaymentButton;
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
    'street street'
    'city city'
    'state country'
    'phone_number phone_number'
    'gatherPaymentButton gatherPaymentButton';
  &.gatheringPayment {
    grid-template-areas:
      'copy copy'
      'first_name last_name'
      'cc_number cc_number'
      'month year'
      'zip verification_value'
      'submitButton submitButton';
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    grid-template-areas:
      'copy copy street street'
      'copy copy city city'
      'copy copy state country'
      'copy copy phone_number phone_number'
      'copy copy gatherPaymentButton gatherPaymentButton';
    &.gatheringPayment {
      grid-template-areas:
        'copy copy first_name last_name'
        'copy copy cc_number cc_number'
        'copy copy month year'
        'copy copy zip verification_value'
        'copy copy submitButton submitButton';
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
    grid-area: street;
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

  *[id='#/properties/first_name'] {
    grid-area: first_name;
  }

  *[id='#/properties/last_name'] {
    grid-area: last_name;
  }

  *[id='#/properties/number'] {
    grid-area: cc_number;
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
    ${SubmitButton} {
      display: none;
    }
    ${ProcessingMessage} {
      display: flex;
    }
  }
`

export default PaymentFiat
