import { serialize } from 'cookie'
import type { NextApiResponse } from 'next'
import { assertInt, isProd } from '@lib'

const TOKEN_NAME = 'token'

export const setTokenCookie = (res: NextApiResponse, token: string) => {
  const SESSION_LENGTH_IN_DAYS = assertInt(
    process.env.NEXT_PUBLIC_SESSION_LENGTH_IN_DAYS,
    'NEXT_PUBLIC_SESSION_LENGTH_IN_DAYS',
  )
  const MAX_AGE = 60 * 60 * 24 * SESSION_LENGTH_IN_DAYS
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: isProd(), // enforce safe (https) cookies in Production
    path: '/',
    sameSite: 'lax',
  })
  res.setHeader('Set-Cookie', cookie)
}

export const removeTokenCookie = (res: NextApiResponse) => {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })
  res.setHeader('Set-Cookie', cookie)
}
