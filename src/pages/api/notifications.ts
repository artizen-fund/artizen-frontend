import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import { assert } from '@lib'

const initNotifications = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const NOTIFICATIONS_API = assert(process.env.NOTIFICATIONS_API, 'NOTIFICATIONS_API')
    const { userId } = JSON.parse(req.body)

    const computedUserHmac = crypto.createHmac('sha256', NOTIFICATIONS_API).update(userId).digest('hex')

    res.status(200).send({ computedUserHmac })
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export default withSentry(initNotifications)
