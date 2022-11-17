import { createApolloClient } from '@lib'
import { CREATE_USER } from '@gql'
import { ICreateUserMutation } from '@types'

export const createUserProfile = async ({ publicAddress, email }: UserBundle, token: string) => {
  const apolloClient = createApolloClient(token)
  return await apolloClient.mutate<ICreateUserMutation>({
    mutation: CREATE_USER,
    variables: { email, publicAddress: publicAddress?.toLowerCase() },
  })
}
