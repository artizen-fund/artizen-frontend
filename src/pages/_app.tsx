import React from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { ApolloProvider } from '@apollo/client'
import {
  isProd,
  withAuth,
  initializeApollo,
  CourierNotification,
  LayoutContextProvider,
  UserContextProvider,
} from '@lib'
import packageJson from '../../package.json'

import '@public/styles/reset.css'
import '@public/styles/globals.css'

const App = ({
  Component,
  pageProps,
}: AppProps & {
  pageProps: any
}) => {
  // eslint-disable-next-line
  console.log(`--- version: ${packageJson.version} ----`)

  const apolloClient = initializeApollo(pageProps?.apolloData || {})

  return (
    <ApolloProvider client={apolloClient}>
      <UserContextProvider>
        <CourierNotification>
          <LayoutContextProvider>
            <Component {...pageProps} />
          </LayoutContextProvider>
        </CourierNotification>
      </UserContextProvider>
    </ApolloProvider>
  )
}

// export default isProd() ? App : dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
// temporary shim to retain authguard on staging
export default dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
