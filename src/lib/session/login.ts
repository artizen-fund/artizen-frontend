import type { Magic } from 'magic-sdk'
import { ApolloClient } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

export interface loginWithEmailProps {
  email: string
  magic: Magic
}

async function handleLoginWithEmail(data: loginWithEmailProps) {
  const didToken = await data.magic.auth.loginWithMagicLink({email: data.email, showUI: false })
  if (!didToken) throw 'Error retrieving token with email'

  return didToken
} 

export interface loginWithSocialProps {
  provider: string
  magic: Magic
}


async function handleLoginWithSocial(data: loginWithSocialProps) {
  const didToken = await data.magic.oauth.loginWithRedirect({
    provider: data.provider, // google, apple, etc
    redirectURI: new URL('/callback', window.location.origin).href, // required redirect to finish social login
  })

  if (!didToken) throw 'Error retrieving token with social'

  return didToken
}

const createSession = async (
  apolloClient: ApolloClient<object>,
  loginWithEmail?: loginWithEmailProps, 
  loginWithSocial?: loginWithSocialProps, 
  ) => {
  
  
    const didToken = loginWithEmail && await handleLoginWithEmail(loginWithEmail) || 
                    loginWithSocial && await handleLoginWithSocial(loginWithSocial)

  console.log('didToken   ', didToken) 
  


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
