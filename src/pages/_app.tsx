import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { IntercomProvider } from 'react-use-intercom'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider, useApollo, envString, envBool } from '@lib'

import '@public/styles/reset.css'
import '@public/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<ArtizenUser>()
  const { apolloClient } = useApollo(pageProps, user)

  useEffect(() => {
    // setUser({ loading: true })
    fetch('/api/user')
      .then(res => res.json())
      .then(async data => {
        if (data.id) {
          console.log('user data', data)
          setUser(data)
          // const balance = await getBalance(data.publicAddress)
          // console.log('user balance  ', balance)
        } else {
          setUser(undefined)
        }
      })
  }, [])

  const { query } = useRouter()
  if (query && query.pass && query.pass === envString('NEXT_PUBLIC_DEV_PASSWORD')) {
    localStorage.setItem('pass', envString('NEXT_PUBLIC_DEV_PASSWORD'))
  }

  const isProd = envBool('NEXT_PUBLIC_PROD')

  const isDevAndPassedPassword =
    typeof window !== 'undefined' && !isProd && query.pass === envString('NEXT_PUBLIC_DEV_PASSWORD')

  const isDevAndGetLocalstore =
    typeof window !== 'undefined' && !isProd && localStorage.getItem('pass') === envString('NEXT_PUBLIC_DEV_PASSWORD')

  const isProdClient = typeof window !== 'undefined' && isProd

  const passwordMatches = isDevAndGetLocalstore || isDevAndPassedPassword || isProdClient

  return (
    <>
      <IntercomProvider appId={envString('NEXT_PUBLIC_INTERCOM')}>
        <SessionProvider {...{ user, setUser }}>
          <ApolloProvider client={apolloClient}>
            {/* <Toaster /> */}
            <Component {...pageProps} {...{ passwordMatches }} />
          </ApolloProvider>
        </SessionProvider>
      </IntercomProvider>
    </>
  )
}

export default App
