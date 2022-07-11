import { createApolloClient } from '@lib'
import { CREATE_USER } from '@gql'
import { ICreateUserMutation } from '@types'
import type { MagicUserMetadata } from 'magic-sdk'

export const createUserProfile = async ({ issuer, publicAddress, email }: MagicUserMetadata, token: string) => {
  const apolloClient = createApolloClient(token)
  return await apolloClient.query<ICreateUserMutation>({
    query: CREATE_USER,
    variables: { email, issuer, publicAddress: publicAddress?.toLowerCase() },
  })
}
