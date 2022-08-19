import { ApolloClient } from '@apollo/client'
import { userMetadataVar, trackEventF, intercomEventEnum } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

export const createSession = async (apolloClient: ApolloClient<object>, didToken: string) => {
  const apiData = await fetch('/api/createSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${didToken}`,
    },
  })
  const { token, metadata } = await apiData.json()
  if (!token || !metadata) throw 'Error creating session from API'

  userMetadataVar(metadata)
  // this will now get picked up by ApolloClient authLink
  localStorage.setItem('token', token)

  const { data } = await apolloClient.query<IGetUserQuery>({ query: GET_USER, variables: { issuer: metadata.issuer } })
  if (data.User.length < 1) throw 'Error retrieving user'

  trackEventF(intercomEventEnum.USER_LOGIN)
}
