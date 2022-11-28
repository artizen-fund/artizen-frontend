import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import jwt from 'jsonwebtoken'
import { setTokenCookie, assert } from '@lib'
import { createNewToken } from '../../lib/utilsServer/createNewToken'

const checkSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const JWT_SECRET = assert(process.env.JWT_SECRET, 'JWT_SECRET')

    if (!req.cookies.token) {
      console.warn('Error: Token not found in cookies.')
      return res.json({})
    }

    const { token } = req.cookies
    const metadata = jwt.verify(token, JWT_SECRET) as UserBundle

    // Refresh the JWT for the user each time they send a request to /user so they only get logged out after SESSION_LENGTH_IN_DAYS of inactivity
    const newToken = createNewToken(metadata)
    setTokenCookie(res, newToken)

    res.status(200).json({
      token: newToken,
      metadata: {
        email: metadata.email,
        publicAddress: metadata.publicAddress,
      },
    })
  } catch (error) {
    console.error('error checking session    ', error)
    res.status(200).json({})
  }
}

export default withSentry(checkSession)
