import React from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { IntercomProvider } from 'react-use-intercom'
import { ApolloProvider } from '@apollo/client'
import { assert, isProd, withAuth, MagicProvider, initializeApollo } from '@lib'
import IntercomContextProvider from '../lib/IntercomContextProvider'

import '@public/styles/reset.css'
import '@public/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const NEXT_PUBLIC_INTERCOM_APP_ID = assert(process.env.NEXT_PUBLIC_INTERCOM_APP_ID, 'NEXT_PUBLIC_INTERCOM_APP_ID')

  const apolloClient = initializeApollo(pageProps?.apolloData || {})

  return (
    <IntercomProvider appId={NEXT_PUBLIC_INTERCOM_APP_ID}>
      <ApolloProvider client={apolloClient}>
        <MagicProvider>
          {/* <Toaster /> */}
          <IntercomContextProvider>
            <Component {...pageProps} />
          </IntercomContextProvider>
        </MagicProvider>
      </ApolloProvider>
    </IntercomProvider>
  )
}

export default isProd() ? App : dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
