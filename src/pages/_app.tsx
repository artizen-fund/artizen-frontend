import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { IntercomProvider } from 'react-use-intercom'
import { ApolloProvider } from '@apollo/client'
import { assert, isProd, useApollo, withAuth, MagicProvider } from '@lib'

import '@public/styles/reset.css'
import '@public/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const NEXT_PUBLIC_INTERCOM_APP_ID = assert(process.env.NEXT_PUBLIC_INTERCOM_APP_ID, 'NEXT_PUBLIC_INTERCOM_APP_ID')

  const { apolloClient } = useApollo(pageProps)

  return (
    <IntercomProvider appId={NEXT_PUBLIC_INTERCOM_APP_ID}>
      <ApolloProvider client={apolloClient}>
        <MagicProvider>
          {/* <Toaster /> */}
          <Component {...pageProps} />
        </MagicProvider>
      </ApolloProvider>
    </IntercomProvider>
  )
}

export default isProd() ? App : dynamic(() => Promise.resolve(withAuth()(App)), { ssr: false })
