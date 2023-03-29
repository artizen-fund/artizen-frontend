import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
import { syncCourierUser } from '@lib'

/* A Courier profile for the user already exists upon wallet signup, but we don't have their email deets yet.
 * This will update the profile, and initiate the welcome message.
 */

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

    await syncCourierUser(req.body)
    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export default syncCourier
