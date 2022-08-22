import { GET_USERS_BY_PUBLIC_ADDRESSES } from '@gql'
import { createApolloClient } from '@lib'
import { IGetUsersByPublicAddressQuery } from '@types'

export async function getUsersByPublicAddress(addresses: string[], token: string) {
  const apolloClient = createApolloClient(token)
  const users = await apolloClient.query<IGetUsersByPublicAddressQuery>({
    query: GET_USERS_BY_PUBLIC_ADDRESSES,
    variables: { addresses },
  })
  return users
}
