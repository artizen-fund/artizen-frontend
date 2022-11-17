import { createApolloClient } from '@lib'
import { UPDATE_USER_FROM_SERVER } from '@gql'

export const updateUserProfile = async ({ email, publicAddress }: UserBundle, token: string) => {
  const apolloClient = createApolloClient(token)
  return await apolloClient.mutate({
    mutation: UPDATE_USER_FROM_SERVER,
    variables: { email, publicAddress: publicAddress?.toLowerCase() },
  })
}
