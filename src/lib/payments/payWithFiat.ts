import { assert } from '@lib'
import { IUser } from '@types'
import { FormState } from '../../components/Donations/PaymentFiat/form'
import type { MagicUserMetadata } from 'magic-sdk'

const getConfirmDonationURL = () => {
  return `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }/crowdfunding/confirmDonation`
}

const payWithFiat = async (amount: number, paymentData: FormState, user?: IUser, userMetadata?: MagicUserMetadata) => {
  if (!userMetadata || !user || !userMetadata.publicAddress) {
    throw 'Error: user session not found.'
  }

  const walletAddress = userMetadata.publicAddress

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
  if (!paymentMethodResponse) throw 'Error retrieving payment method data'

  const paymentMethod = await paymentMethodResponse.json()
  if (!paymentMethod) throw 'Error interpreting payment method data'

  const {
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
  if (!orderResponse) throw 'Error retrieving order'

  const order = await orderResponse.json()
  if (!order) throw 'Error interpreting order data'

  const authorizationResponse = await fetch(`/api/onramp/authorization?orderId=${order.id}`)
  if (!authorizationResponse) throw 'Error retrieving order'

  const authorization = await authorizationResponse.json()
  if (!authorization) throw 'Error interpreting authorization data'

  // todo: what do we do with this?
}

export default payWithFiat
