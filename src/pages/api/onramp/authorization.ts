import api from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from '@lib'

const authorizationHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SENDWYRE_SECRET = assert(process.env.SENDWYRE_SECRET, 'SENDWYRE_SECRET')
  const SENDRYRE_BASE_URL = assert(process.env.NEXT_PUBLIC_SENDWYRE_BASE_URL, 'NEXT_PUBLIC_SENDWYRE_BASE_URL')
  const sdk = api('@wyre-hub/v4#fyktdr28l3w9dqt1')
  // todo: what's that? ^ why is it hard coded?
  sdk.auth(SENDWYRE_SECRET)
  sdk.server(SENDRYRE_BASE_URL)

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
