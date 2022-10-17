import { ApolloClient } from '@apollo/client'
import { createSession } from '@lib'

export const loginWithEmail = async (apolloClient: ApolloClient<object>, magic: MagicInstance, email: string) => {
  const didToken = await magic.auth.loginWithMagicLink({ email, showUI: false })
  console.log('loginWithEmail  didToken   ', didToken)
  if (!didToken) throw 'Error retrieving token with email'
  createSession(apolloClient, didToken)
}
