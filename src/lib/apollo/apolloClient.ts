import { ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { assert, isServer, isClient } from '@lib'
import { cache } from './'
import { getCookie } from 'cookies-next'

let apolloClient: ApolloClient<NormalizedCacheObject>

export const createApolloClient = () => {
  const didToken = getCookie('didToken')

  const httpLink = createHttpLink({
    uri: assert(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, 'NEXT_PUBLIC_HASURA_GRAPHQL_URL'),
    headers: {},
    credentials: 'same-origin',
  })
  const wsLink = isClient()
    ? new WebSocketLink({
        uri: assert(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_WEBHOOK, 'NEXT_PUBLIC_HASURA_GRAPHQL_WEBHOOK'),
        options: {
          reconnect: true,
          lazy: true,
          timeout: 30000,
          inactivityTimeout: 30000,
        },
      })
    : undefined

  // This sets up a middleware that circumstantially uses the correct query token.
  // https://www.apollographql.com/docs/react/networking/authentication/#header
  const authLink = setContext((_, { headers }) => {
    const didToken = getCookie('didToken')

    const newHeaders: Record<string, string> = {}
    if (isServer() && !didToken) {
      // server request (usually for SSR)
      newHeaders['x-hasura-admin-secret'] = assert(
        process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        'HASURA_GRAPHQL_ADMIN_SECRET',
      )
    } else if (isServer() && didToken) {
      // server request on behalf of user via MagicLink DecentralizedID token
      newHeaders['Authorization'] = `Bearer ${didToken}`
    } else if (!isServer() && didToken) {
      // client request
      newHeaders['Authorization'] = `Bearer ${didToken}`
    } else {
      // Public access
      newHeaders['x-hasura-unauthorized-role'] = 'public'
    }

    return {
      headers: {
        ...headers,
        ...newHeaders,
      },
    }
  })

  const link =
    wsLink === undefined
      ? authLink.concat(httpLink)
      : ApolloLink.split(
          ({ query }) => {
            const definition = getMainDefinition(query)
            return isClient() && definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
          },
          authLink.concat(wsLink),
          authLink.concat(httpLink),
        )

  return new ApolloClient({
    ssrMode: isServer(),
    link,
    cache,
  })
}

export function initializeApollo(initialState?: unknown, didToken?: string): ApolloClient<NormalizedCacheObject> {
  const newApolloClient = createApolloClient()
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here.
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = newApolloClient.extract()
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // Combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((destinationVar: any) =>
          sourceArray.every((sourceVar: any) => !isEqual(destinationVar, sourceVar)),
        ),
      ],
    })
    // Restore the cache with the merged data
    newApolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServer()) {
    return newApolloClient
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = newApolloClient
  }
  return newApolloClient
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props['apolloData'] = client.cache.extract()
  }
  return pageProps
}
