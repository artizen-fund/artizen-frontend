import { ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { assert, isServer } from '@lib'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { cache } from './cache'

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
  headers: {},
  credentials: 'same-origin',
})

// This sets up a middleware that circumstantially uses the correct query token.
// https://www.apollographql.com/docs/react/networking/authentication/#header
export const authLink: ApolloLink = setContext(async (_, { headers }) => {
  const session: any = await getSession()
  const newHeaders: Record<string, string> = {}
  newHeaders['Authorization'] = `Bearer ${session.token}`

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

export const createApolloClient = (didToken?: string) => {
  const httpLink = createHttpLink({
    uri: assert(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, 'NEXT_PUBLIC_HASURA_GRAPHQL_URL'),
    headers: {},
    credentials: 'same-origin',
  })

  // This sets up a middleware that circumstantially uses the correct query token.
  // https://www.apollographql.com/docs/react/networking/authentication/#header
  const authLink = setContext((_, { headers }) => {
    const newHeaders: Record<string, string> = {}
    if (isServer() && !didToken) {
      // server request (usually for SSR)
      newHeaders['x-hasura-admin-secret'] = assert(process.env.HASURA_ADMIN_SECRET, 'HASURA_ADMIN_SECRET')
    } else if (isServer()) {
      // server request on behalf of user via MagicLink DecentralizedID token
      newHeaders['Authorization'] = `Bearer ${didToken}`
    } else {
      // client request
      const token = localStorage.getItem('token')
      if (token) {
        newHeaders['Authorization'] = `Bearer ${token}`
      } else {
        // Public access
        newHeaders['x-hasura-unauthorized-role'] = 'public'
      }
    }
    return {
      headers: {
        ...headers,
        ...newHeaders,
      },
    }
  })

  return new ApolloClient({
    ssrMode: isServer(),
    link: authLink.concat(httpLink),
    cache,
  })
}
