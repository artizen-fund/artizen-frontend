import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { isValid, isExpirationDateValid, isSecurityCodeValid } from 'creditcard.js'
import { DonationSummary, Button, DonationHelpLink, Form, CheckboxControl } from '@components'
import {
  payWithFiat,
  userMetadataVar,
  UserContext,
  useFormLocalStorage,
  assert,
  sleep,
  DonationContext,
  useProcessDonation,
} from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/paymentFiat'

const PaymentFiat = () => {
  const { amount, fee, setOrder, setError } = useProcessDonation()

  const { setDonationStage } = useContext(DonationContext)
  const { loggedInUser } = useContext(UserContext)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const LOCALSTORAGE_KEY = 'fiatPayment'
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)

  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  // TODO: this absolutely doesn't work

  const [processing, setProcessing] = useState(false)
  const [wyreAuthorization, setWyreAuthorization] = useState<{ authorization3dsUrl: string }>({
    authorization3dsUrl: '',
  })

  const metadata = useReactiveVar(userMetadataVar)

  const getOrderStatus = async (orderId: string) => {
    const wyreBaseUrl = assert(process.env.NEXT_PUBLIC_SENDWYRE_BASE_URL, 'NEXT_PUBLIC_SENDWYRE_BASE_URL')
    const options = { method: 'GET', headers: { Accept: 'application/json' } }

    const orderResponse = await fetch(`${wyreBaseUrl}/v3/orders/${orderId}`, options)
    const orderJson = await orderResponse.json()

    return orderJson.status
  }

  const processTransaction = async () => {
    if (!loggedInUser) {
      return
    }
    setProcessing(true)
    try {
      const { order, authorization } = await payWithFiat(amount as number, data, loggedInUser, metadata)
      setWyreAuthorization(authorization)
      setOrder?.(order)

      if (authorization.authorization3dsUrl) {
        // TODO: move it to a hook or something
        let orderStatus = await getOrderStatus(order.id)
        while (orderStatus === 'RUNNING_CHECKS') {
          await sleep(15000)
          orderStatus = await getOrderStatus(order.id)
        }
      }
    } catch (error) {
      console.error(error)
      setProcessing(false)
      setError?.('Payment Failed')
    }
    setDonationStage?.('processCrypto')
  }

  useEffect(() => {
    const errors: Array<ErrorObject> = []
    if (!!data.number && !isValid(data.number)) {
      errors.push({
        instancePath: '/number',
        message: 'Invalid credit card number',
        schemaPath: '#/properties/number',
        keyword: '',
        params: {},
      })
    }
    if (!!data.number && !!data.verification_value && !isSecurityCodeValid(data.number, data.verification_value)) {
      errors.push({
        instancePath: '/verification_value',
        message: 'Invalid verification number',
        schemaPath: '#/properties/verification_value',
        keyword: '',
        params: {},
      })
    }
    if (!!data.month && !!data.year && !isExpirationDateValid(data.month, data.year)) {
      errors.push({
        instancePath: '/year',
        message: 'Invalid expiration date',
        schemaPath: '#/properties/year',
        keyword: '',
        params: {},
      })
    }
    setAdditionalErrors(errors)
  }, [data])

  return (
    <Wrapper className={processing ? 'processing' : wyreAuthorization?.authorization3dsUrl !== '' ? 'authorizing' : ''}>
      <Information>
        <div>
          <Title>Let’s enter your payment information</Title>
          <DonationHelpLink />
        </div>

        <DonationSummary />

        <CheckboxControl
          data={savePaymentInfo}
          handleChange={() => setSavePaymentInfo(!savePaymentInfo)}
          label="Save payment information for next time."
          path="derp"
        />
      </Information>
      {wyreAuthorization?.authorization3dsUrl !== '' ? (
        <WyreAuthorization src={wyreAuthorization?.authorization3dsUrl} frameBorder="0"></WyreAuthorization>
      ) : (
        <Form
          localStorageKey={LOCALSTORAGE_KEY}
          {...{ schema, uischema, initialState, data, setData, additionalErrors }}
          readonly={processing}
        >
          <SubmitButton stretch onClick={processTransaction} disabled={processing}>
            Transfer ${(amount as number) + (fee || 0)}
          </SubmitButton>
        </Form>
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

const Title = styled.h1``

const SubmitButton = styled(props => <Button {...props} />)`
  grid-area: submit;
`

const ProcessingMessage = styled.div`
  display: none;
  grid-area: processing;
`

const WyreAuthorization = styled.iframe`
  grid-area: authorizing;
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
  &.authorizing {
    grid-template-areas:
      'copy copy'
      'authorizing authorizing'
      'authorizing authorizing'
      'authorizing authorizing'
      'authorizing authorizing'
      'authorizing authorizing'
      'authorizing authorizing';
  }
  &.processing {
    grid-template-areas:
      'copy copy'
      'processing processing'
      'processing processing'
      'processing processing'
      'processing processing'
      'processing processing'
      'processing processing';
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
    &.authorizing {
      grid-template-areas:
        'copy copy authorizing authorizing'
        'copy copy authorizing authorizing'
        'copy copy authorizing authorizing'
        'copy copy authorizing authorizing'
        'copy copy authorizing authorizing'
        'copy copy authorizing authorizing';
    }
    &.processing {
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
