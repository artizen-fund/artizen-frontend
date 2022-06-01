import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { isServer } from '@lib'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = (user?: ArtizenUser) => {
  return new ApolloClient({
    ssrMode: isServer(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, // Server URL (must be absolute)
      ...(user && {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
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
              merge(existing = [], incoming) {
                // return [...existing, ...incoming]
                return [...existing, ...incoming.filter((d: any) => existing.every((s: any) => !isEqual(d, s)))]
              },
            },
            User: {
              // Don't cache separate results based on
              // any of this field's arguments.
              // keyArgs: ['where'],
              keyArgs: ['where'],
              // Concatenate the incoming list items with
              // the existing list items.
              merge(existing = [], incoming) {
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

export function initializeApollo(initialState = null, user?: ArtizenUser) {
  const _apolloClient = createApolloClient(user)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // Gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // Combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServer()) {
    return _apolloClient
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: any, user?: ArtizenUser) {
  // Const [token, setToken] = useState({loading: true, token: null, error: null})

  // Const state = pageProps[APOLLO_STATE_PROP_NAME]
  // Const store = useMemo(() => !loading && initializeApollo(state, user), [loading || state])
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  // Const store = useMemo(() =>  initializeApollo(state, user), [user, state])
  const store = useMemo(() => initializeApollo(state, user), [user, state])

  return { apolloClient: store, loading: Boolean(!user) }
}
