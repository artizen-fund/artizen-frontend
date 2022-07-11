import type { Magic } from 'magic-sdk'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { loginUser, userMetadata } from '@lib'
import { GET_USER } from '@gql'
import { ICheckUserQuery } from '@types'

const createSession = async (
  email: string,
  magic: Magic,
  apolloClient: ApolloClient<NormalizedCacheObject>,
  setToken: (s: string) => void,
) => {
  const token = await magic.auth.loginWithMagicLink({ email, showUI: false })
  if (!token) throw 'error retrieving token'
  const data = await loginUser(token)
  console.log(data)
  userMetadata(data)
}

export { createSession }
