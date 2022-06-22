import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { IntercomProvider } from 'react-use-intercom'
import { ApolloProvider } from '@apollo/client'
import { assert, SessionProvider, useApollo, withAuth } from '@lib'

import '@public/styles/reset.css'
import '@public/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const NEXT_PUBLIC_INTERCOM_APP_ID = assert(process.env.NEXT_PUBLIC_INTERCOM_APP_ID, 'NEXT_PUBLIC_INTERCOM_APP_ID')

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
      <IntercomProvider appId={NEXT_PUBLIC_INTERCOM_APP_ID}>
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

// eslint-disable-next-line
console.log("process.env.NEXT_PUBLIC_PRO=====    ", process.env.NEXT_PUBLIC_PROD, "--typeof--", typeof process.env.NEXT_PUBLIC_PROD )

const devApp = dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })

export default process.env.NEXT_PUBLIC_PROD ? App : devApp
// todo: ^ when we want to restore SSR and dump this password system, strike this line
// export default withAuth()(App)
