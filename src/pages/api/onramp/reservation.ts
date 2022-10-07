import api from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from '@lib'

const reservationHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SENDWYRE_SECRET = assert(process.env.SENDWYRE_SECRET, 'SENDWYRE_SECRET')
  const SENDWYRE_ACCOUNT = assert(process.env.SENDWYRE_ACCOUNT, 'SENDWYRE_ACCOUNT')
  const SENDRYRE_BASE_URL = assert(process.env.NEXT_PUBLIC_SENDWYRE_BASE_URL, 'NEXT_PUBLIC_SENDWYRE_BASE_URL')

  const sdk = api('@wyre-hub/v4#fyktdr28l3w9dqt1')
  sdk.auth(SENDWYRE_SECRET)
  sdk.server(SENDRYRE_BASE_URL)

  if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })

  const { amount, walletAddress, country } = req.body
  try {
    const reservation = await sdk.CreateWalletOrderReservation({
      sourceCurrency: 'USD',
      amount,
      paymentMethod: 'debit-card',
      destCurrency: 'MUSDC',
      country,
      dest: `matic:${walletAddress}`,
      referrerAccountId: SENDWYRE_ACCOUNT,
    })
    res.status(200).json(reservation)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

export default reservationHandler
