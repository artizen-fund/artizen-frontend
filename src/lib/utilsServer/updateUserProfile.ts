import { createApolloClient } from '@lib'
import { UPDATE_USER } from '@gql'
import { IUpdateUserMutation } from '@types'

interface ProfileBundle {
  email: string
  issuer: string
  publicAddress: string
}

export const updateUserProfile = async ({ email, issuer, publicAddress }: ProfileBundle, token: string) => {
  const apolloClient = createApolloClient(token)
  return await apolloClient.query<IUpdateUserMutation>({
    query: UPDATE_USER,
    variables: { email, issuer, publicAddress: publicAddress?.toLowerCase() },
  })
}
