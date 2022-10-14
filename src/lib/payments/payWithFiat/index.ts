import { IUser } from '@types'
import type { MagicUserMetadata } from 'magic-sdk'
import { FormState } from '@forms/paymentFiat'
import getReservation from './getReservation'
import getPaymentMethod from './getPaymentMethod'
import getOrder from './getOrder'
import getAuthorization from './getAuthorization'
import { intercomEventEnum, trackEventF, sleep } from '@lib'

export const payWithFiat = async (
  amount: number,
  paymentData: FormState,
  user?: IUser,
  userMetadata?: MagicUserMetadata,
) => {
  if (!userMetadata || !user || !userMetadata.publicAddress || !user.country) {
    throw 'Error: user session not found.'
  }

  const reservation = await getReservation(amount, userMetadata.publicAddress, user.country)

  trackEventF(intercomEventEnum.DONATION_FIAT_START, {
    amount,
    wallet: userMetadata.publicAddress,
    user,
  })

  const {
    transaction: {
      payment_method: { token },
    },
  } = await getPaymentMethod(paymentData, user)

  const order = await getOrder(amount, user, userMetadata.publicAddress, reservation, token, paymentData)

  if (!order.id) {
    throw new Error(order.message)
  }
  // wait 20 seconds before checking Authorization
  await sleep(20000)

  const authorization = await getAuthorization(order.id)
  // TODO: what do we do with this?

  trackEventF(intercomEventEnum.DONATION_FIAT_TOPUP, {
    amount,
    wallet: userMetadata.publicAddress,
    user,
  })

  return { order, authorization }
}
