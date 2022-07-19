import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMagic } from '@lib'
// import { magicLink } from '@lib'
// import Loading from '../components/loading'

const Callback = () => {
  {
  const {push, query} = useRouter()
  const { magic } = useMagic()

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
    
    const res = await fetch('/api/createSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${didToken}`,
      },
    })

    const resP = await res.json()

    console.log('resP    ', resP)
    
    if (res.status === 200) {
      push('/')
    }
  }

  // TODO: Add loading icon
  return 'loading'
  
  }
}

export default Callback
