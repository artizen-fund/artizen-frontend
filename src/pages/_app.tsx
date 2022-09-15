import React from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { ApolloProvider } from '@apollo/client'
import {
  isProd,
  withAuth,
  MagicProvider,
  initializeApollo,
  CourierNotification,
  DonationContextProvider,
  CampaignProvider,
} from '@lib'
import packageJson from '../../package.json'

import '@public/styles/reset.css'
import '@public/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  // eslint-disable-next-line
  console.log(`--- version: ${packageJson.version} ----`)
  const apolloClient = initializeApollo(pageProps?.apolloData || {})

  return (
    <ApolloProvider client={apolloClient}>
      <MagicProvider>
        <CourierNotification>
          <CampaignProvider>
            <DonationContextProvider>
              <Component {...pageProps} />
            </DonationContextProvider>
          </CampaignProvider>
        </CourierNotification>
      </MagicProvider>
    </ApolloProvider>
  )
}

export default isProd() ? App : dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
