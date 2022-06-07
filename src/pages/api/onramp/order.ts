import api from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { envString } from '@lib'

const sdk = api('@wyre-hub/v4#fxprd1kl2b0beym')
sdk.auth(envString('SENDWYRE_SECRET'))

const orderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })

  const {
    amount,
    walletAddress,
    debitCard,
    address,
    reservationId,
    givenName,
    familyName,
    email,
    phone,
    referenceId,
    ipAddress,
  } = req.body

  try {
    const order = await sdk.CreateOrder({
      debitCard,
      address,
      reservationId,
      amount,
      sourceCurrency: 'USD',
      destCurrency: 'MUSDC',
      dest: `ethereum:${walletAddress}`,
      referrerAccountId: envString('SENDWYRE_ACCOUNT'),
      givenName,
      familyName,
      email,
      phone,
      referenceId,
      ipAddress,
      trigger3ds: true,
    })

    res.status(200).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

export default orderHandler
