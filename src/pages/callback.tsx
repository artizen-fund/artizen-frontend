import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMagic, userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { ApolloClient, useApolloClient } from '@apollo/client'
import { IGetUserQuery } from '@types'
// import { magicLink } from '@lib'
// import Loading from '../components/loading'

const Callback = () => {
  {
  const {push, query} = useRouter()
  const { magic } = useMagic()
  const apolloClient = useApolloClient()

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    // Send token to server to validate
    query.provider && finishSocialLogin()

  }, [query])


  const finishSocialLogin = async () => {
    const result = await magic.oauth.getRedirectResult()
    authenticateWithServer(result.magic.idToken)
  }

  const authenticateWithServer = async (didToken: string) => {
    
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
  
    const { data } = await apolloClient.query<IGetUserQuery>({ 
      query: GET_USER, variables: { issuer: metadata.issuer }, 
    })
    console.log('data  ', data)
    if (data.User.length < 1) throw 'Error retrieving user'

    
  }

  // TODO: Add loading icon
  return 'loading'
  
  }
}

export default Callback
