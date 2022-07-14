import type { Magic } from 'magic-sdk'
import { ApolloClient } from '@apollo/client'
import { api, userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

const createSession = async (email: string, magic: Magic, apolloClient: ApolloClient<object>) => {
  const didToken = await magic.auth.loginWithMagicLink({ email, showUI: false })
  if (!didToken) throw 'Error retrieving token'

  const { token, metadata } = await api.login(didToken)
  if (!token || !metadata) throw 'Error creating session from API'

  userMetadataVar(metadata)
  // this will now get picked up by ApolloClient authLink
  localStorage.setItem('token', token)

  const { data } = await apolloClient.query<IGetUserQuery>({ query: GET_USER, variables: { issuer: metadata.issuer } })
  if (data.User.length < 1) throw 'Error retrieving user'
}

export { createSession }
