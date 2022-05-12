import type { NextApiRequest, NextApiResponse } from 'next'
import { magicAdmin, removeTokenCookie } from '@lib'
import jwt from 'jsonwebtoken'
import type { MagicUserMetadata } from 'magic-sdk'

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })
    let token = req.cookies.token
    let user = jwt.verify(token, process.env.JWT_SECRET!) as MagicUserMetadata
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
