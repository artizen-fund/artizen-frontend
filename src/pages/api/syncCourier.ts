import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createUserCourierProfile } from '@lib'

const syncCourier = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error('Session not found')
    }
    const { email } = JSON.parse(req.body)
    createUserCourierProfile(session.id, email)
    res.status(200)
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export default syncCourier
