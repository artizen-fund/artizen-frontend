import { createApolloClient } from '@lib'
import { GET_USER } from '@gql'
import { ICheckUserQuery } from '@types'

export const getUserProfile = async (issuer: string, token: string) => {
  const apolloClient = createApolloClient(token)
  return await apolloClient.query<ICheckUserQuery>({ query: GET_USER, variables: { issuer } })
}
