import type { NextApiRequest, NextApiResponse } from 'next'
import { createUserCourierProfile } from '@lib'

const syncCourier = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  try {
    const { id, email } = req.body
    await createUserCourierProfile(id, email)
    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export default syncCourier
