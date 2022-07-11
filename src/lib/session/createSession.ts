import type { Magic } from 'magic-sdk'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { fetchToken } from '@lib'
import { GET_USER } from '@gql'
import { ICheckUserQuery } from '@types'

const createSession = async (
  email: string,
  magic: Magic,
  apolloClient: ApolloClient<NormalizedCacheObject>,
  setToken: (s: string) => void,
) => {
  const magicToken = await magic.auth.loginWithMagicLink({ email, showUI: false })
  if (!magicToken) throw 'error retrieving token'

  const { issuer, token } = await fetchToken(magicToken)
  setToken(token)

  const {
    data: { User },
  } = await apolloClient.query<ICheckUserQuery>({ query: GET_USER, variables: { issuer } })
  return User[0]
}

export { createSession }
