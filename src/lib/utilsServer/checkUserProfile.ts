import { createApolloClient } from '@lib'
import { CHECK_USER } from '@gql'
import { ICheckUserQuery } from '@types'

export async function checkUserProfile(email: string, token: string) {
  const apolloClient = createApolloClient(token)
  const hasuraUserCheck = await apolloClient.query<ICheckUserQuery>({ query: CHECK_USER, variables: { email } })
  return hasuraUserCheck.data.User.length < 1
    ? { id: '', email: '', userProfileType: 'NEW' }
    : !hasuraUserCheck.data.User[0].issuer
    ? { id: '', email: hasuraUserCheck.data.User[0].email, userProfileType: 'OLD' }
    : { id: hasuraUserCheck.data.User[0].id, email: hasuraUserCheck.data.User[0].email, userProfileType: 'EXISTING' }
}
