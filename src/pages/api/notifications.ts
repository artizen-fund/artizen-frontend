import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { envString } from '@lib'

export default async function initNotifications(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = JSON.parse(req.body)

    const computedUserHmac = crypto.createHmac('sha256', envString('NOTIFICATIONS_API')).update(userId).digest('hex')

    // const didToken = req.headers.authorization.substr(7)

    // // Validate Magic's DID token
    // magic.token.validate(didToken)

    // const metadata = await magic.users.getMetadataByToken(didToken)

    // console.log('metadata  ', metadata)

    res.status(200).send({ computedUserHmac })
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}
