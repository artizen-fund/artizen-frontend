import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { IntercomProvider } from 'react-use-intercom'
import { ApolloProvider } from '@apollo/client'
import { assert, SessionProvider, useApollo } from '@lib'

import '@public/styles/reset.css'
import '@public/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  const NEXT_PUBLIC_INTERCOM = assert(process.env.NEXT_PUBLIC_INTERCOM, 'NEXT_PUBLIC_INTERCOM')

  const [user, setUser] = useState<ArtizenUser>()
  const { apolloClient } = useApollo(pageProps, user)

  useEffect(() => {
    // setUser({ loading: true })
    fetch('/api/user')
      .then(res => res.json())
      .then(async data => {
        if (data.id) {
          setUser(data)
          // const balance = await getBalance(data.publicAddress)
          // console.log('user balance  ', balance)
        } else {
          setUser(undefined)
        }
      })
  }, [])

  return (
    <>
      <IntercomProvider appId={NEXT_PUBLIC_INTERCOM}>
        <SessionProvider {...{ user, setUser }}>
          <ApolloProvider client={apolloClient}>
            {/* <Toaster /> */}
            <Component {...pageProps} />
          </ApolloProvider>
        </SessionProvider>
      </IntercomProvider>
    </>
  )
}

export default App
