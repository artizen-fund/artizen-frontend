import { assert } from '@lib'
import { IUser } from '@types'
import { FormState } from '@forms/paymentFiat'

const getPaymentMethod = async (paymentData: FormState, user: IUser) => {
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

  return paymentMethod
}

export default getPaymentMethod
