import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import { verify } from 'jsonwebtoken'
import { setTokenCookie, assert } from '@lib'
import { createNewToken } from '../../lib/utilsServer/createNewToken'
import type { MagicUserMetadata } from 'magic-sdk'

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const JWT_SECRET = assert(process.env.JWT_SECRET, 'JWT_SECRET')

    if (!req.cookies.token) {
      console.warn('Error: Token not found in cookies.')
      return res.status(498).json({})
    }

    const { token } = req.cookies
    const jwtUser = verify(token, JWT_SECRET) as MagicUserMetadata
    if (!jwtUser.issuer) throw 'Bad JWT payload.'

    // Refresh each time they send a request so they only get logged out after SESSION_LENGTH_IN_DAYS of inactivity
    const newToken = createNewToken(jwtUser)

    if (!newToken) {
      throw 'Error creating token'
    }

    setTokenCookie(res, newToken)
    res.status(200).json({
      jwtUser,
      token: newToken,
    })
  } catch (error) {
    res.status(404).json({})
  }
}

export default withSentry(user)
