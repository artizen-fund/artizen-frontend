import type { Magic } from 'magic-sdk'
import { ApolloClient } from '@apollo/client'
import { fetchTokenAndMetadata, userMetadata } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

// todo: this is bonked
const checkSession = async (apolloClient: ApolloClient<object>) => {
  const didToken = await magic.auth.loginWithMagicLink({ email, showUI: false })
  if (!didToken) throw 'Error retrieving token'

  const { token, metadata } = await fetchTokenAndMetadata(didToken)
  userMetadata(metadata)
  // this will now get picked up by ApolloClient authLink
  localStorage.setItem('token', token)

  const { data } = await apolloClient.query<IGetUserQuery>({ query: GET_USER, variables: { issuer: metadata.issuer } })
  if (data.User.length < 1) throw 'Error retrieving user'
  console.log('user query success', data.User)
}

export { checkSession }
