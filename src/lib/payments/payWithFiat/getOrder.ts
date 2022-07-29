import { IUser } from '@types'
import { FormState } from '@forms/paymentFiat'

const getConfirmDonationURL = () => {
  return `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }/crowdfunding/confirmDonation`
}

const getOrder = async (
  amount: number,
  user: IUser,
  walletAddress: string,
  reservation: any, // todo: find a Typescript signature from SendWyre
  token: string,
  paymentData: FormState,
) => {
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

  return order
}

export default getOrder
