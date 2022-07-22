import type { ApolloClient } from '@apollo/client'
import { createSession } from '@lib'

export const finishSocialLogin = async (apolloClient: ApolloClient<object>, magic: MagicInstance) => {
  const result = await magic.oauth.getRedirectResult()
  await createSession(apolloClient, result.magic.idToken)
  document.location = '/'
}
