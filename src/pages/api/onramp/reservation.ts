import api from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'

const sdk = api('@wyre-hub/v4#fxprd1kl2b0beym')
sdk.auth(process.env.SENDWYRE_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })

  const { amount, walletAddress } = req.body
  try {
    const reservation = await sdk.CreateWalletOrderReservation({
      sourceCurrency: 'USD',
      amount: amount,
      paymentMethod: 'debit-card',
      destCurrency: 'MUSDC',
      country: 'US',
      dest: `matic:${walletAddress}`,
      redirectUrl: process.env.BASE_URL,
      failureRedirectUrl: process.env.BASE_URL,
      referrerAccountId: process.env.SENDWYRE_ACCOUNT,
      lockFields: ['destCurrency', 'paymentMethod', 'dest'],
    })

    console.log('Reservation', reservation)

    res.status(200).json(reservation)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
