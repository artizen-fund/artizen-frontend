import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import { Magic } from '@magic-sdk/admin'
import type { MagicUserMetadata } from 'magic-sdk'
import jwt from 'jsonwebtoken'
import { removeTokenCookie, assert } from '@lib'

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const MAGIC_SECRET_KEY = assert(process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY, 'NEXT_PUBLIC_MAGIC_SECRET_KEY')
  const magic = new Magic(MAGIC_SECRET_KEY)

  try {
    if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })
    const JWT_SECRET = assert(process.env.JWT_SECRET, 'JWT_SECRET')
    const { token } = req.cookies
    const user = jwt.verify(token, JWT_SECRET) as MagicUserMetadata
    removeTokenCookie(res)

    // Add the try/catch because a user's session may have already expired with Magic (expired 7 days after login)
    try {
      if (!user.issuer) throw 'Bad JWT payload.'
      await magic.users.logoutByIssuer(user.issuer)
    } catch (error) {
      console.error('Users session with Magic already expired')
    }
    res.writeHead(302, { Location: '/' })
    res.end()
  } catch (error) {
    res.status(401).json({ message: 'User is not logged in' })
  }
}

export default withSentry(logout)
