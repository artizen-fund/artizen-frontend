import { IUser } from '@types'
import type { MagicUserMetadata } from 'magic-sdk'
import { FormState } from '@forms/paymentFiat'
import getReservation from './getReservation'
import getPaymentMethod from './getPaymentMethod'
import getOrder from './getOrder'
import getAuthorization from './getAuthorization'

export const payWithFiat = async (
  amount: number,
  paymentData: FormState,
  user?: IUser,
  userMetadata?: MagicUserMetadata,
) => {
  if (!userMetadata || !user || !userMetadata.publicAddress) {
    throw 'Error: user session not found.'
  }

  const reservation = await getReservation(amount, userMetadata.publicAddress)

  const {
    transaction: {
      payment_method: { token },
    },
  } = await getPaymentMethod(paymentData, user)

  const order = await getOrder(amount, user, userMetadata.publicAddress, reservation, token, paymentData)

  const authorization = getAuthorization(order.id)
  // todo: what do we do with this?
}
