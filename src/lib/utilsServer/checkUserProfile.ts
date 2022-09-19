import { createApolloClient } from '@lib'
import { CHECK_USER } from '@gql'
import { ICheckUserQuery } from '@types'

export async function checkUserProfile(email: string, token: string) {
  const apolloClient = createApolloClient(token)
  const hasuraUserCheck = await apolloClient.query<ICheckUserQuery>({ query: CHECK_USER, variables: { email } })
  return hasuraUserCheck.data.User.length < 1
    ? { id: '', type: 'NEW' }
    : !hasuraUserCheck.data.User[0].issuer
    ? { id: '', type: 'OLD' }
    : { id: hasuraUserCheck.data.User[0].id, type: 'EXISTING' }
}
