import { useMemo } from 'react'
import { ApolloClient, HttpLink, HttpOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { assert, isServer } from '@lib'

let apolloClient: ApolloClient<NormalizedCacheObject>

export const createApolloClient = (token?: string) => {
  const httpOptions: HttpOptions = {
    uri: assert(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, 'NEXT_PUBLIC_HASURA_GRAPHQL_URL'),
    headers: {},
    credentials: 'same-origin',
  }

  if (token) {
    httpOptions.headers['Authorization'] = `Bearer ${token}`
  } else if (isServer()) {
    httpOptions.headers['x-hasura-admin-secret'] = assert(process.env.HASURA_ADMIN_SECRET, 'HASURA_ADMIN_SECRET')
  }

  return new ApolloClient({
    ssrMode: isServer(),
    link: new HttpLink(httpOptions),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            exampleEntities: {
              keyArgs: false,
            },
            Project: {
              // Don't cache separate results based on any of this field's arguments.
              // keyArgs: ['where'],
              keyArgs: false,
              // Concatenate the incoming list items with the existing list items.
              merge(existing, incoming) {
                return !existing
                  ? incoming
                  : [
                      ...existing,
                      ...incoming.filter((incomingVar: any) =>
                        existing.every((existingVar: any) => !isEqual(incomingVar, existingVar)),
                      ),
                    ]
              },
            },
            User: {
              // Don't cache separate results based on any of this field's arguments.
              // keyArgs: ['where'],
              keyArgs: ['where'],
              // Concatenate the incoming list items with the existing list items.
              merge(existing, incoming) {
                return !existing ? incoming : [...existing, ...incoming]
              },
            },
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState?: any, user?: ArtizenUser): ApolloClient<NormalizedCacheObject> {
  const newApolloClient = createApolloClient(user?.token)
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

export function useApollo(pageProps: any, user?: ArtizenUser) {
  /* IMPORTANT NOTE:
   *  Users are currently not initialized until after useApollo is called by _app.tsx
   *  That is not going to change!
   *  We need a better way to re-initialized ApolloClient upon login,
   *    or (more likely) we need to add session tracking to this lib.
   */
  const state = pageProps['apolloData']
  const store = useMemo(() => initializeApollo(state, user), [user, state])
  return { apolloClient: store, loading: Boolean(!user) }
}
