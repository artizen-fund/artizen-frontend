import api from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from '@lib'

const authorizationHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SENDWYRE_SECRET = assert(process.env.SENDWYRE_SECRET, 'SENDWYRE_SECRET')
  const sdk = api('@wyre-hub/v4#fxprd1kl2b0beym')
  // todo: what's that? ^ why is it hard coded?
  sdk.auth(SENDWYRE_SECRET)
  if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })
  try {
    const authorization = await sdk.GetAuthorization({ orderId: req.query.orderId })
    res.status(200).json(authorization)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

export default authorizationHandler
