import type { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
import { withSentry } from '@sentry/nextjs'
import { setTokenCookie, assert, checkUserProfile, updateUserProfile, createUserProfile, getUserProfile } from '@lib'
import { createNewToken } from '../../lib/utilsServer/createNewToken'

// I think this is obsolete
const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const MAGIC_SECRET_KEY = assert(process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY, 'NEXT_PUBLIC_MAGIC_SECRET_KEY')
  const magic = new Magic(MAGIC_SECRET_KEY)

  try {
    const didToken = req?.headers?.authorization?.substr(7)
    if (!didToken) throw 'Token not found.'

    magic.token.validate(didToken)

    const metadata = await magic.users.getMetadataByToken(didToken)
    if (!metadata || !metadata.email || !metadata.issuer) throw 'Token metadata not found.'

    const token = createNewToken(metadata)
    if (!token) {
      throw 'Error creating token'
    }

    const userProfileType = await checkUserProfile(metadata.email, token)

    if (userProfileType === 'OLD') {
      await updateUserProfile(metadata, token)
    } else if (userProfileType === 'NEW') {
      await createUserProfile(metadata, token)
    }

    const user = await getUserProfile(metadata.issuer, token)

    setTokenCookie(res, token)
    res.status(200).send(user)
  } catch (error) {
    console.error('error from api login:', error)
    res.status(500).end()
  }
}

export default withSentry(login)
