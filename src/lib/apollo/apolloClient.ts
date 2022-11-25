import { ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { assert, isServer } from '@lib'
import { getSession } from 'next-auth/react'

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
  headers: {},
  credentials: 'same-origin',
})

// This sets up a middleware that circumstantially uses the correct query token.
// https://www.apollographql.com/docs/react/networking/authentication/#header
export const authLink: ApolloLink = setContext(async (_, { headers }) => {
  const session = await getSession()
  const newHeaders: Record<string, string> = {}
  newHeaders['Authorization'] = `Bearer ${session?.token}`

  if (isServer()) {
    // server request (usually for SSR)
    newHeaders['x-hasura-admin-secret'] = assert(process.env.HASURA_ADMIN_SECRET, 'HASURA_ADMIN_SECRET')
  } else {
    newHeaders['x-hasura-unauthorized-role'] = 'public'
  }

  return {
    headers: {
      ...headers,
      ...newHeaders,
    },
  }
})

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props['apolloData'] = client.cache.extract()
  }
  return pageProps
}
