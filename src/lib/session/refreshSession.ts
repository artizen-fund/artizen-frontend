import { ApolloClient } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

const refreshSession = async (apolloClient: ApolloClient<object>) => {
  const apiData = await fetch('/api/checkSession')
  const { token, metadata } = await apiData.json()
  if (!token || !metadata) throw 'Error refreshing session from API'

  userMetadataVar(metadata)
  // this will now get picked up by ApolloClient authLink
  localStorage.setItem('token', token)

  const { data } = await apolloClient.query<IGetUserQuery>({ query: GET_USER, variables: { issuer: metadata.issuer } })
  if (data.Users.length === 0) throw 'Error retrieving user'
}

const mockRefreshSessionData = {
  token: 'herpderp',
  metadata: {
    issuer: 'herpderp',
  },
}

export { refreshSession, mockRefreshSessionData }
