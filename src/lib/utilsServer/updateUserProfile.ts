import { createApolloClient } from '@lib'
import { UPDATE_USER } from '@gql'
import { IUpdateUserMutation } from '@types'
import type { MagicUserMetadata } from 'magic-sdk'

export const updateUserProfile = async ({ email, issuer, publicAddress }: MagicUserMetadata, token: string) => {
  const apolloClient = createApolloClient(token)
  return await apolloClient.mutate<IUpdateUserMutation>({
    mutation: UPDATE_USER,
    variables: { email, issuer, publicAddress: publicAddress?.toLowerCase() },
  })
}
