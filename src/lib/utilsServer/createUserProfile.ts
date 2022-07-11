import { createApolloClient } from '@lib'
import { CREATE_USER } from '@gql'
import { ICreateUserMutation } from '@types'

interface ProfileBundle {
  email: string
  issuer: string
  publicAddress: string
}

export const createUserProfile = async ({ issuer, publicAddress, email }: ProfileBundle, token: string) => {
  const apolloClient = createApolloClient(token)
  return await apolloClient.query<ICreateUserMutation>({
    query: CREATE_USER,
    variables: { email, issuer, publicAddress: publicAddress?.toLowerCase() },
  })
}
