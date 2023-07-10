import React from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { ApolloProvider } from '@apollo/client'
import { Toast } from '@trycourier/react-toast'
import { StyledToast } from '@components'
import {
  initIntercom,
  CourierNotification,
  LayoutContextProvider,
  SeasonContextProvider,
  getWagmiClient,
  initializeApollo,
  isProd,
  withAuth,
} from '@lib'
import packageJson from '../../package.json'

import '@public/styles/reset.css'
import '@public/styles/globals.css'
import { WagmiConfig } from 'wagmi'
import { SessionProvider } from 'next-auth/react'

const { config } = getWagmiClient()

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  pageProps: any
}) => {
  // eslint-disable-next-line
  console.log(`--- version: ${packageJson.version} ----`)
  initIntercom()

  const apolloClient = initializeApollo(pageProps?.apolloData || {})
  return (
    <WagmiConfig config={config}>
      <SessionProvider session={session}>
        <ApolloProvider client={apolloClient}>
          <CourierNotification>
            <Toast theme={StyledToast} position="top-right" />
            <SeasonContextProvider>
              <LayoutContextProvider>
                <Component {...pageProps} />
              </LayoutContextProvider>
            </SeasonContextProvider>
          </CourierNotification>
        </ApolloProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}

// we can't run the password blocker for now because it blocks tests
// export default isProd() ? App : dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
export default isProd() ? App : dynamic(() => Promise.resolve(App), { ssr: false })
