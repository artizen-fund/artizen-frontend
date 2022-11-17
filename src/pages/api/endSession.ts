import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import jwt from 'jsonwebtoken'
import { removeTokenCookie, assert } from '@lib'

const endSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.cookies.token) return res.status(401).json({ message: 'User is not logged in' })
    removeTokenCookie(res)

    // todo: is any more logout code necessary?

    res.writeHead(302, { Location: '/' })
    res.end()
  } catch (error) {
    res.status(401).json({ message: 'User is not logged in' })
  }
}

export default withSentry(endSession)
