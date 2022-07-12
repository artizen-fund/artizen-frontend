import type { Magic } from 'magic-sdk'
import { ApolloClient } from '@apollo/client'
import { fetchToken } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

const createSession = async (email: string, magic: Magic, apolloClient: ApolloClient<object>) => {
  const didToken = await magic.auth.loginWithMagicLink({ email, showUI: false })
  if (!didToken) throw 'error retrieving token'
  const { token, issuer } = await fetchToken(didToken)

  // this will now get picked up by ApolloClient authLink
  localStorage.setItem('token', token)

  const { data } = await apolloClient.query<IGetUserQuery>({ query: GET_USER, variables: { issuer } })
  console.log(data)
  // userMetadata(data.User[0])
}

export { createSession }
