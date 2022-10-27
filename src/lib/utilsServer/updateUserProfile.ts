import { createApolloClient } from '@lib'
import { UPDATE_USER_FROM_SERVER } from '@gql'
import type { MagicUserMetadata } from 'magic-sdk'

export const updateUserProfile = async ({ email, issuer, publicAddress }: MagicUserMetadata, token: string) => {
  const apolloClient = createApolloClient(token)
  return await apolloClient.mutate({
    mutation: UPDATE_USER_FROM_SERVER,
    variables: { email, issuer, publicAddress: publicAddress?.toLowerCase() },
  })
}
