import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { assert } from '@lib'
import { ApolloProvider } from '@apollo/client'
import { Toast } from '@trycourier/react-toast'
import { StyledToast } from '@components'
import { PrivyProvider } from '@privy-io/react-auth'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'
import { setCookie } from 'cookies-next'

import {
  initIntercom,
  CourierNotification,
  LayoutContextProvider,
  SeasonContextProvider,
  SeasonSubcriptionProvider,
  getWagmiChains,
  initializeApollo,
  isProd,
} from '@lib'
import packageJson from '../../package.json'

import '@public/styles/reset.css'
import '@public/styles/globals.css'

import { SessionProvider } from 'next-auth/react'

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  pageProps: any
}) => {
  // eslint-disable-next-line
  console.log(`--- version: ${packageJson.version} ----`)
  initIntercom()

  let apolloClient = initializeApollo(pageProps?.apolloData || {})

  const NEXT_PUBLIC_PRIVY_APP_ID = assert(process.env.NEXT_PUBLIC_PRIVY_APP_ID, 'NEXT_PUBLIC_PRIVY_APP_ID')

  console.log('NEXT_PUBLIC_PRIVY_APP_ID', NEXT_PUBLIC_PRIVY_APP_ID)

  return (
    <PrivyProvider
      appId={NEXT_PUBLIC_PRIVY_APP_ID}
      onSuccess={async data => {
        console.log('user is logged', data)

        const token = await fetch('/api/auth/createUser', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: data }),
        })

        const tokenJson = await token.json()

        console.log('tokenJson', tokenJson)

        setCookie('didToken', tokenJson.token, { secure: true, sameSite: 'strict' })

        apolloClient = initializeApollo(pageProps?.apolloData || {})
      }}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
      }}
    >
      <PrivyWagmiConnector wagmiChainsConfig={getWagmiChains()}>
        <SessionProvider session={session}>
          <ApolloProvider client={apolloClient}>
            <CourierNotification>
              <Toast theme={StyledToast} position="top-right" />

              <SeasonContextProvider>
                <SeasonSubcriptionProvider>
                  <LayoutContextProvider>
                    <Component {...pageProps} />
                  </LayoutContextProvider>
                </SeasonSubcriptionProvider>
              </SeasonContextProvider>
            </CourierNotification>
          </ApolloProvider>
        </SessionProvider>
      </PrivyWagmiConnector>
    </PrivyProvider>
  )
}

// we can't run the password blocker for now because it blocks tests
// export default isProd() ? App : dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
export default isProd() ? App : dynamic(() => Promise.resolve(App), { ssr: false })
