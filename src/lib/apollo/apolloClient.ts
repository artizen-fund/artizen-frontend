import { useMemo, useState } from 'react'
import { gql, ApolloClient, HttpLink, HttpOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { assert, isServer } from '@lib'
import { cache } from './'

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
    cache,
  })
}

export function initializeApollo(initialState?: any, token?: string): ApolloClient<NormalizedCacheObject> {
  const newApolloClient = createApolloClient(token)
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

export function useApollo(pageProps?: any, initialToken?: string) {
  const [token, setToken] = useState<string | undefined>(initialToken)
  const state = pageProps?.apolloData || {}
  const store = useMemo(() => initializeApollo(state, token), [token, state])
  return { apolloClient: store, setToken }
}
