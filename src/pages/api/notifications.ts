import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from '@lib'

const initNotifications = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const NOTIFICATIONS_API = assert(process.env.NOTIFICATIONS_API, 'NOTIFICATIONS_API')
    const { userId } = JSON.parse(req.body)

    const computedUserHmac = crypto.createHmac('sha256', NOTIFICATIONS_API).update(userId).digest('hex')

    // const didToken = req.headers.authorization.substr(7)

    // // Validate Magic's DID token
    // magic.token.validate(didToken)

    // const metadata = await magic.users.getMetadataByToken(didToken)

    // console.log('metadata  ', metadata)

    res.status(200).send({ computedUserHmac })
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export default initNotifications
