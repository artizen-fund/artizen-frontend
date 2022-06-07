import type { NextApiRequest, NextApiResponse } from 'next'
import { magicAdmin, removeTokenCookie, envString } from '@lib'
import jwt from 'jsonwebtoken'
import type { MagicUserMetadata } from 'magic-sdk'

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })
    const { token } = req.cookies
    const user = jwt.verify(token, envString('JWT_SECRET')) as MagicUserMetadata
    removeTokenCookie(res)

    // Add the try/catch because a user's session may have already expired with Magic (expired 7 days after login)
    try {
      if (!user.issuer) throw 'Bad JWT payload.'
      await magicAdmin.users.logoutByIssuer(user.issuer)
    } catch (error) {
      console.log('Users session with Magic already expired')
    }
    res.writeHead(302, { Location: '/grants/featured/upcoming' })
    res.end()
  } catch (error) {
    res.status(401).json({ message: 'User is not logged in' })
  }
}

export default logout
