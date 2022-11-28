import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import {
  setTokenCookie,
  assert,
  checkUserProfile,
  updateUserProfile,
  createUserProfile,
  createUserCourierProfile,
  addUserToNewsLetter,
} from '@lib'
import { createNewToken } from '../../lib/utilsServer/createNewToken'

const createSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const MAGIC_SECRET_KEY = assert(process.env.MAGIC_SECRET_KEY, 'MAGIC_SECRET_KEY')

  try {
    const didToken = req?.headers?.authorization?.replace('Bearer ', '')
    if (!didToken) throw 'Token not found.'

    //add user to newsletter
    // await addUserToNewsLetter(userEmail)

    // sync courier user
    // await createUserCourierProfile(userId, userEmail)

    // setTokenCookie(res, token)
    // res.status(200).send({ token, metadata })
  } catch (error) {
    console.error('error from api login:', error)
    res.status(500).end()
  }
}

export default withSentry(createSession)
