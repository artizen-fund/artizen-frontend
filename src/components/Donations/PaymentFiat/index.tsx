import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import { ErrorObject } from 'ajv'
import { isValid, isExpirationDateValid, isSecurityCodeValid } from 'creditcard.js'
import { Button, DonationHelpLink, Form, CheckboxControl, PaymentFiatAddress, Table, TableCell } from '@components'
import {
  payWithFiat,
  userMetadataVar,
  UserContext,
  useFormLocalStorage,
  hasRequiredProperties,
  assert,
  sleep,
  DonationContext,
  useProcessDonation,
  getQuote,
  calculateFee,
} from '@lib'
import { breakpoint } from '@theme'
import { schema, uischema, initialState, FormState } from '@forms/paymentFiat'

const PaymentFiat = () => {
  const { amount, setOrder } = useProcessDonation()

  const { setDonationStage } = useContext(DonationContext)
  const { loggedInUser } = useContext(UserContext)
  const [additionalErrors, setAdditionalErrors] = useState<Array<ErrorObject>>([])

  const LOCALSTORAGE_KEY = 'fiatPayment'
  const [data, setData] = useFormLocalStorage<FormState>(LOCALSTORAGE_KEY, initialState)
  // Init fee with 5 USD which is the minimum
  const [fee, setFee] = useState(5)

  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  // TODO: ^ where/how is this stored?
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

  // amount, metadata, data, loggedInUser
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
      setDonationStage?.('processCrypto')
    } catch (error) {
      setProcessing(false)
    }
  }

  if (!!loggedInUser && !hasRequiredProperties(['street1', 'city', 'state', 'country', 'zip'], loggedInUser)) {
    return <PaymentFiatAddress {...{ setDonationStage, amount: amount as number }} />
  }

  const getFee = async () => {
    if (amount && metadata?.publicAddress && loggedInUser?.country) {
      try {
        const quote = await getQuote(amount, metadata?.publicAddress, loggedInUser?.country)
        const {
          fee: { USD: fee },
        } = quote
        setFee(fee)
      } catch (error) {
        console.error(error)
        setFee(calculateFee(amount!, loggedInUser?.country!))
      }
    }
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

  useEffect(() => {
    getFee()
  }, [])

  return (
    <Wrapper className={processing ? 'processing' : ''}>
      <Information>
        <div>
          <Title>Let’s enter your payment information</Title>
          <DonationHelpLink />
        </div>

        <Table title="Donation Summary">
          <TableCell>
            <div>Donation: </div>
            <div>${amount} USD</div>
          </TableCell>
          <TableCell>
            <div>Transaction fee:</div>
            <div>${fee} USD</div>
          </TableCell>
          <TableCell highlight>
            <div>Purchase total:</div>
            <div>${(amount as number) + fee} USD</div>
          </TableCell>
        </Table>

        <CheckboxControl
          data={savePaymentInfo}
          handleChange={() => setSavePaymentInfo(!savePaymentInfo)}
          label="Save payment information for next time."
          path="derp"
        />
      </Information>
      {wyreAuthorization?.authorization3dsUrl !== '' ? (
        <iframe src={wyreAuthorization?.authorization3dsUrl} frameBorder="0"></iframe>
      ) : (
        <Form
          localStorageKey={LOCALSTORAGE_KEY}
          {...{ schema, uischema, initialState, data, setData, additionalErrors }}
          readonly={processing}
        >
          <SubmitButton stretch onClick={processTransaction}>
            Transfer ${(amount as number) + fee}
          </SubmitButton>
          <ProcessingMessage>hum de dooo</ProcessingMessage>
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
