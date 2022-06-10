import type { NextApiRequest, NextApiResponse } from 'next'
import { magicAdmin, setTokenCookie } from '@lib'
import {
  createNewToken,
  checkTypeOfUser,
  // updateUserCreatedPro,
  createNewUser,
} from '../../lib/utilsServer'

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const didToken = req?.headers?.authorization?.substr(7)
    if (!didToken) throw 'Token not found.'

    magicAdmin.token.validate(didToken)

    const metadata = await magicAdmin.users.getMetadataByToken(didToken)
    if (!metadata || !metadata.email) throw 'Token metadata not found.'

    const token = createNewToken(metadata)
    if (!token) {
      throw 'Error creating token'
    }

    const check = await checkTypeOfUser(metadata.email, token)
    if (!check) throw 'Error retrieving user type.'

    if (check.type === 'OLD_USER') {
      // await updateUserCreatedPro(metadata, token)
    }

    if (check.type === 'NEW_USER') {
      await createNewUser(metadata, token)
    }

    setTokenCookie(res, token)
    res.status(200).send({ done: true })
  } catch (error) {
    console.error('error from api login ')
    res.status(500).end()
  }
}

export default login
