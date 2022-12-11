import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createUserCourierProfile } from '@lib'

const syncCourier = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }
    const { email } = req.body
    await createUserCourierProfile(session.user.id, email)
    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export default syncCourier
