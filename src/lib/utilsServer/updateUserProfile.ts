import { createApolloClient } from '@lib'
import { UPDATE_USER } from '@gql'
import { IUpdateUserMutation } from '@types'

export const updateUserProfile = async ({ email, issuer, publicAddress }: ArtizenUser, token: string) => {
  const apolloClient = createApolloClient(token)
  return await apolloClient.query<IUpdateUserMutation>({
    query: UPDATE_USER,
    variables: { email, issuer, publicAddress: publicAddress?.toLowerCase() },
  })
}
