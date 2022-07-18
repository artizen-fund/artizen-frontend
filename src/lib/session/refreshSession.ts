import { ApolloClient } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

const refreshSession = async (apolloClient: ApolloClient<object>) => {
  const apiData = await fetch('/api/refreshSession')
  const { token, metadata } = await apiData.json()
  if (!token || !metadata) throw 'Error refreshing session from API'

  userMetadataVar(metadata)
  // this will now get picked up by ApolloClient authLink
  localStorage.setItem('token', token)

  const { data } = await apolloClient.query<IGetUserQuery>({ query: GET_USER, variables: { issuer: metadata.issuer } })
  if (data.User.length < 1) throw 'Error retrieving user'
}

export { refreshSession }
