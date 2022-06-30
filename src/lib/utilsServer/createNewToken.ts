import { sign } from 'jsonwebtoken'
import { assert, assertInt } from '@lib'

export const createNewToken = ({ issuer, publicAddress, email }: ArtizenUser) => {
  const SESSION_LENGTH_IN_DAYS = assertInt(
    process.env.NEXT_PUBLIC_SESSION_LENGTH_IN_DAYS,
    'NEXT_PUBLIC_SESSION_LENGTH_IN_DAYS',
  )
  const JWT_SECRET = assert(process.env.JWT_SECRET, 'JWT_SECRET')
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * SESSION_LENGTH_IN_DAYS
  return sign(
    {
      issuer,
      publicAddress,
      email,
      exp,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user', 'user_from_8base'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': issuer,
      },
    },
    JWT_SECRET,
  )
}
