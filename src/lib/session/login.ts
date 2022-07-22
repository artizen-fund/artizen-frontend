import { OAuthProvider } from '@magic-ext/oauth'
import { ApolloClient } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

async function handleLoginWithEmail(magic: MagicInstance, email: string) {
  const didToken = await magic.auth.loginWithMagicLink({ email, showUI: false })
  if (!didToken) throw 'Error retrieving token with email'
  return didToken
}

const createSession = async (apolloClient: ApolloClient<object>, magic: MagicInstance, email: string) => {
  if (!email) {
    throw 'Error: one of email'
  }

  const didToken = await handleLoginWithEmail(magic, email)

  // const didToken = email ?  : await handleLoginWithSocial(magic, provider!)
  // TODO: remove non-null assertion as part of social refactor ^

  const apiData = await fetch('/api/createSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${didToken}`,
    },
  })
  const { token, metadata } = await apiData.json()
  if (!token || !metadata) throw 'Error creating session from API'

  userMetadataVar(metadata)
  // this will now get picked up by ApolloClient authLink
  localStorage.setItem('token', token)

  const { data } = await apolloClient.query<IGetUserQuery>({ query: GET_USER, variables: { issuer: metadata.issuer } })
  if (data.User.length < 1) throw 'Error retrieving user'
}

export { createSession }
