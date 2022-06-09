import { useMemo } from 'react'
import { ApolloClient, HttpLink, HttpOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { assert, isClient, isServer } from '@lib'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient(user?: ArtizenUser) {
  const httpOptions: HttpOptions = {
    uri: assert(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, 'NEXT_PUBLIC_HASURA_GRAPHQL_URL'),
    headers: {},
    credentials: 'same-origin',
  }

  if (user) {
    httpOptions.headers['Authorization'] = `Bearer ${user?.token}`
  } else if (isServer()) {
    httpOptions.headers['x-hasura-admin-secret'] = assert(process.env.HASURA_ADMIN_SECRET, 'HASURA_ADMIN_SECRET')
  }

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink(httpOptions),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            Project: {
              // Don't cache separate results based on
              // any of this field's arguments.
              // keyArgs: ['where'],
              keyArgs: false,
              // Concatenate the incoming list items with
              // the existing list items.
              merge(incoming, existing = []) {
                // return [...existing, ...incoming]
                return [
                  ...existing,
                  ...incoming.filter((incomingVar: any) =>
                    existing.every((existingVar: any) => !isEqual(incomingVar, existingVar)),
                  ),
                ]
              },
            },
            User: {
              // Don't cache separate results based on
              // any of this field's arguments.
              // keyArgs: ['where'],
              keyArgs: ['where'],
              // Concatenate the incoming list items with
              // the existing list items.
              merge(incoming, existing = []) {
                return [...existing, ...incoming]
                // return [
                //   ...existing,
                //   ...incoming.filter((d) =>
                //     existing.every((s) => !isEqual(d, s))
                //   ),
                // ]
              },
            },
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState?: any, user?: ArtizenUser): ApolloClient<NormalizedCacheObject> {
  const newApolloClient = createApolloClient(user)
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // Gets hydrated here
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
  if (typeof window === 'undefined') {
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
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }
  return pageProps
}

export function useApollo(pageProps: any, user?: ArtizenUser) {
  // Const [token, setToken] = useState({loading: true, token: null, error: null})

  console.log('user   ', user)
  // Const state = pageProps[APOLLO_STATE_PROP_NAME]
  // Const store = useMemo(() => !loading && initializeApollo(state, user), [loading || state])
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  // Const store = useMemo(() =>  initializeApollo(state, user), [user, state])
  const store = useMemo(() => initializeApollo(state, user), [user, state])
  return { apolloClient: store, loading: Boolean(!user) }
}
