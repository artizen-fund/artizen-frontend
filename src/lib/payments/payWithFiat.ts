import { assert } from '@lib'
import { IUser } from '@types'
import { FormState } from '../../components/Donations/PaymentFiat/form'

const getConfirmDonationURL = () => {
  return `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }/crowdfunding/confirmDonation`
}

const payWithFiat = async (amount: number, walletAddress: string, paymentData: FormState, user: IUser) => {
  const reservationResponse = await fetch('/api/onramp/reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      walletAddress,
    }),
  })

  const reservation = await reservationResponse.json()

  const card = {
    payment_method: {
      credit_card: {
        ...paymentData,
        email: user.email,
      },
      data: {
        my_payment_method_identifier: 'test_card',
        extra_stuff: {
          some_other_things: 'Can be anything really',
        },
      },
    },
  }

  const SPREEDLY_BASE_URL = assert(process.env.NEXT_PUBLIC_SPREEDLY_BASE_URL, 'NEXT_PUBLIC_SPREEDLY_BASE_URL')
  const SPREEDLY_ENVIRONMENT_KEY = assert(
    process.env.NEXT_PUBLIC_SPREEDLY_ENVIRONMENT_KEY,
    'NEXT_PUBLIC_SPREEDLY_ENVIRONMENT_KEY',
  )
  const SPREEDLY_URL = `${SPREEDLY_BASE_URL}/payment_methods.json?environment_key=${SPREEDLY_ENVIRONMENT_KEY}`

  const paymentMethodResponse = await fetch(SPREEDLY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })

  const paymentMethod = await paymentMethodResponse.json()

  // eslint-disable-next-line no-console
  console.log(paymentMethod)

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transaction: {
      payment_method: { token },
    },
  } = paymentMethod

  const orderResponse = await fetch('/api/onramp/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      walletAddress,
      address: {
        street1: 'Jhon street',
        city: 'San Diego',
        state: 'CA',
        postalCode: '98327',
        country: 'US',
      },
      reservationId: reservation.reservation,
      givenName: paymentData.first_name,
      familyName: paymentData.last_name,
      email: user.email,
      phone: paymentData.phone_number,
      referenceId: `${getConfirmDonationURL()}|${user.id}`,
      ipAddress: '1.1.1.1',
      paymentMethodToken: token,
    }),
  })

  const order = await orderResponse.json()
  // eslint-disable-next-line no-console
  console.log(order)

  const authorizationResponse = await fetch(`/api/onramp/authorization?orderId=${order.id}`)

  const authorization = await authorizationResponse.json()

  // eslint-disable-next-line no-console
  console.log(authorization)
}

export default payWithFiat
