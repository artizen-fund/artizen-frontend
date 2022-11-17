import { createApolloClient } from '@lib'
import { CHECK_USER } from '@gql'
import { ICheckUserQuery } from '@types'

export async function checkUserProfile(email: string, token: string) {
  const apolloClient = createApolloClient(token)
  const hasuraUserCheck = await apolloClient.query<ICheckUserQuery>({ query: CHECK_USER, variables: { email } })
  return hasuraUserCheck.data.Users.length < 1
    ? { id: '', email: '', userProfileType: 'NEW' }
    : { id: hasuraUserCheck.data.Users[0].id, email: hasuraUserCheck.data.Users[0].email, userProfileType: 'EXISTING' }
}
