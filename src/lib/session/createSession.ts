import type { Magic } from 'magic-sdk'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { fetchToken, userMetadata, initializeApollo } from '@lib'
import { GET_USER, CHECK_USER } from '@gql'
import { IGetUserQuery, ICheckUserQuery } from '@types'

const createSession = async (
  email: string,
  magic: Magic,
  apolloClient: ApolloClient<NormalizedCacheObject>,
  setToken: (s: string) => void,
) => {
  const didToken = await magic.auth.loginWithMagicLink({ email, showUI: false })
  if (!didToken) throw 'error retrieving token'
  const { token, issuer } = await fetchToken(didToken)
  setToken(token)

  const freshClient = initializeApollo({}, token)
  const { data } = await freshClient.query<IGetUserQuery>({ query: GET_USER, variables: { issuer } })
  console.log(data)
  // userMetadata(data.User[0])
}

export { createSession }
