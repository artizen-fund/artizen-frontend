import type { Magic } from 'magic-sdk'
import { ApolloClient } from '@apollo/client'
import { userMetadataVar, api } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

const refreshSession = async (apolloClient: ApolloClient<object>) => {
  const { token, metadata } = await api.refreshSession()
  if (!token || !metadata) throw 'Error refreshing session from API'

  userMetadataVar(metadata)
  // this will now get picked up by ApolloClient authLink
  localStorage.setItem('token', token)

  const { data } = await apolloClient.query<IGetUserQuery>({ query: GET_USER, variables: { issuer: metadata.issuer } })
  if (data.User.length < 1) throw 'Error retrieving user'
}

export { refreshSession }
