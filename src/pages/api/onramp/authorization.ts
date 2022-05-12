import api from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'

const sdk = api('@wyre-hub/v4#fxprd1kl2b0beym')
sdk.auth(process.env.SENDWYRE_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })

  try {
    const authorization = await sdk.GetAuthorization({
      orderId: req.query.orderId,
    })

    res.status(200).json(authorization)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
