/* note: These are legacy functions from the web3 repo.
 * 	They have been replaced in checkUserProfile, createUserProfile, etc. with ApolloClient calls.
 * 	Leaving here for the purposes of porting more legacy code, but I expect we'll be deleting these soon enough.
 */

import { assert } from '@lib'

export const queryHasura = async (query: any, token: string) => {
  try {
    const NEXT_PUBLIC_HASURA_GRAPHQL_URL = assert(
      process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
      'NEXT_PUBLIC_HASURA_GRAPHQL_URL',
    )
    const res = await fetch(NEXT_PUBLIC_HASURA_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(query),
    })
    const { errors, data } = await res.json()
    if (errors) {
      throw errors
    }
    return data
  } catch (error) {
    console.error('queryHasura error', error)
  }
}

export const queryHasuraAsAdmin = async (query: any) => {
  try {
    const HASURA_GRAPHQL_ADMIN_SECRET = assert(process.env.HASURA_GRAPHQL_ADMIN_SECRET, 'HASURA_GRAPHQL_ADMIN_SECRET')
    const HASURA_GRAPHQL_URL = assert(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, 'NEXT_PUBLIC_HASURA_GRAPHQL_URL')

    const headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    headers.set('x-hasura-admin-secret', HASURA_ADMIN_SECRET)
    const res = await fetch(HASURA_GRAPHQL_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(query),
    })
    const { errors, data } = await res.json()
    if (errors) {
      throw errors
    }
    return data
  } catch (error) {
    console.error('queryHasuraAsAdmin error', error)
  }
}
