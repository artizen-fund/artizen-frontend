import { OAuthProvider } from '@magic-ext/oauth'
import { ApolloClient } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

export interface loginWithEmailProps {
  email: string
  magic: MagicInstance
}

async function handleLoginWithEmail({ email, magic }: loginWithEmailProps) {
  const didToken = await magic.auth.loginWithMagicLink({ email, showUI: false })
  if (!didToken) throw 'Error retrieving token with email'

  return didToken
}

export interface loginWithSocialProps {
  provider: OAuthProvider
  magic: MagicInstance
}

async function handleLoginWithSocial({ magic, provider }: loginWithSocialProps) {
  const didToken = await magic.oauth.loginWithRedirect({
    provider, // google, apple, etc
    redirectURI: new URL('/callback', window.location.origin).href, // required redirect to finish social login
  })
  // todo… refactor wheeee
  if (!didToken) throw 'Error retrieving token with social'

  return didToken
}

const createSession = async (
  apolloClient: ApolloClient<object>,
  loginWithEmail?: loginWithEmailProps,
  loginWithSocial?: loginWithSocialProps,
) => {
  const didToken =
    (loginWithEmail && (await handleLoginWithEmail(loginWithEmail))) ||
    (loginWithSocial && (await handleLoginWithSocial(loginWithSocial)))

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
