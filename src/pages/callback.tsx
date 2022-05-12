import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { magic } from '@lib'
// import Loading from '../components/loading'

function Callback() {
  const {
    query: { magic_credential, provider },
    push,
  } = useRouter()

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    // Send token to server to validate
    const authenticateWithServer = async (didToken: string) => {
      console.log('didToken  ', didToken)
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
      })

      if (res.status === 200) {
        push('/')
      }
    }

    const finishSocialLogin = async () => {
      magic?.oauth.getRedirectResult().then(result => authenticateWithServer(result.magic.idToken))
    }

    // `loginWithCredential()` returns a didToken for the user logging in
    const finishEmailRedirectLogin = () => {
      if (magic_credential) {
        magic?.auth.loginWithCredential().then(didToken => authenticateWithServer(didToken!))
      }
    }

    provider ? finishSocialLogin() : finishEmailRedirectLogin()
  }, [magic_credential, provider, push])

  // `getRedirectResult()` returns an object with user data from Magic and the social provider

  return 'loading'
}

export default Callback
