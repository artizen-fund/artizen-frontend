import React from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { ApolloProvider } from '@apollo/client'
import {
  withAuth,
  CourierNotification,
  LayoutContextProvider,
  UserContextProvider,
  getWagmiClient,
  initializeApollo,
} from '@lib'
import packageJson from '../../package.json'

import '@public/styles/reset.css'
import '@public/styles/globals.css'
import { WagmiConfig } from 'wagmi'
import { SessionProvider } from 'next-auth/react'

const { client, chains } = getWagmiClient()

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  pageProps: any
}) => {
  // eslint-disable-next-line
  console.log(`--- version: ${packageJson.version} ----`)

  const apolloClient = initializeApollo(pageProps?.apolloData || {})
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={session}>
        <ApolloProvider client={apolloClient}>
          <UserContextProvider>
            <CourierNotification>
              <LayoutContextProvider>
                <Component {...pageProps} chains={chains} />
              </LayoutContextProvider>
            </CourierNotification>
          </UserContextProvider>
        </ApolloProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}

// export default isProd() ? App : dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
// temporary shim to retain authguard on staging
export default dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
