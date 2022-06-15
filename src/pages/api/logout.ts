import type { NextApiRequest, NextApiResponse } from 'next'
import { magicLinkAdmin, removeTokenCookie, assert } from '@lib'
import { withSentry } from '@sentry/nextjs'
import jwt from 'jsonwebtoken'
import type { MagicUserMetadata } from 'magic-sdk'

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })
    const JWT_SECRET = assert(process.env.JWT_SECRET, 'JWT_SECRET')
    const { token } = req.cookies
    const user = jwt.verify(token, JWT_SECRET) as MagicUserMetadata
    removeTokenCookie(res)

    // Add the try/catch because a user's session may have already expired with Magic (expired 7 days after login)
    try {
      if (!user.issuer) throw 'Bad JWT payload.'
      await magicLinkAdmin.users.logoutByIssuer(user.issuer)
    } catch (error) {
      console.error('Users session with Magic already expired')
    }
    res.writeHead(302, { Location: '/grants/featured/upcoming' })
    res.end()
  } catch (error) {
    res.status(401).json({ message: 'User is not logged in' })
  }
}

export default withSentry(logout)
