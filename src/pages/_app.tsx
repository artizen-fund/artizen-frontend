import React from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { ApolloProvider } from '@apollo/client'
import { isProd, withAuth, MagicProvider, initializeApollo, Notification } from '@lib'

import '@public/styles/reset.css'
import '@public/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = initializeApollo(pageProps?.apolloData || {})

  return (
    <ApolloProvider client={apolloClient}>
      <MagicProvider>
        <Notification>
          <Component {...pageProps} />
        </Notification>
      </MagicProvider>
    </ApolloProvider>
  )
}

export default isProd() ? App : dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
