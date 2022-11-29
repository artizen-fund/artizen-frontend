// import { ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client'
// import { setContext } from '@apollo/client/link/context'
// import { assert, isServer } from '@lib'
// import { Session } from 'next-auth'
// import { getSession } from 'next-auth/react'

// export const httpLink = createHttpLink({
//   uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
//   headers: {},
//   credentials: 'same-origin',
// })

// // This sets up a middleware that circumstantially uses the correct query token.
// // https://www.apollographql.com/docs/react/networking/authentication/#header
// export const authLink: ApolloLink = setContext(async (_, { headers }) => {
//   const session: any = await getSession()
//   const newHeaders: Record<string, string> = {}
//   newHeaders['Authorization'] = `Bearer ${session.token}`

//   if (isServer()) {
//     console.log('isServer  authLink  ')
//     // server request (usually for SSR)
//     newHeaders['x-hasura-admin-secret'] = assert(process.env.HASURA_ADMIN_SECRET, 'HASURA_ADMIN_SECRET')
//   } else {
//     console.log('!isServer  authLink  ')
//     newHeaders['x-hasura-unauthorized-role'] = 'public'
//   }

//   console.log('user login')

//   return {
//     headers: {
//       ...headers,
//       ...newHeaders,
//     },
//   }
// })

// export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
//   if (pageProps?.props) {
//     pageProps.props['apolloData'] = client.cache.extract()
//   }
//   return pageProps
// }

import { ApolloClient, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import merge from 'deepmerge'
import { getSession } from 'next-auth/react'
import isEqual from 'lodash/isEqual'
import { assert, isServer } from '@lib'
import { cache } from './'

let apolloClient: ApolloClient<NormalizedCacheObject>

export const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: assert(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, 'NEXT_PUBLIC_HASURA_GRAPHQL_URL'),
    headers: {},
    credentials: 'same-origin',
  })

  // This sets up a middleware that circumstantially uses the correct query token.
  // https://www.apollographql.com/docs/react/networking/authentication/#header
  const authLink = setContext(async (_, { headers }) => {
    const session: any = await getSession()
    const didToken = session ? session.token : undefined
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

export function initializeApollo(initialState?: any): ApolloClient<NormalizedCacheObject> {
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
