import { serialize } from 'cookie'
import type { NextApiResponse } from 'next'
import { envInt, envString } from '@lib'

const TOKEN_NAME = 'token'
const MAX_AGE = 60 * 60 * 24 * envInt('SESSION_LENGTH_IN_DAYS')

export const setTokenCookie = (res: NextApiResponse, token: string) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: envString('NODE_ENV') === 'production', // if true, cookie will only be set if https (won't be set if http)
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
