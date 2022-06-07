/*
  Note: Storybook chokes when this is exported from '@lib/index' due to the presence of jsonwebtoken.
  This has to be imported dummy-style ('../../lib/utilsServer') until a workaround is found.
*/

import jwt from 'jsonwebtoken'
import { isServer, envNumber, envString } from '@lib'

export const createNewToken = ({ issuer, publicAddress, email }: ArtizenUser) => {
  if (isServer()) return
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24
  return jwt.sign(
    {
      issuer,
      publicAddress,
      email,
      exp: exp * envNumber('SESSION_LENGTH_IN_DAYS'),
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user', 'user_from_8base'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': issuer,
      },
    },
    envString('JWT_SECRET'),
  )
}

export const checkTypeOfUser = async (email: string, token: string) => {
  const loadUserFromHasura = {
    query: `{
        User( where: {email: {_eq: "${email}"}}) {
          email
          issuer
        }
      }`,
  }
  const loadUserFrom8base = {
    query: `{
        user(email:"${email}"){
          email
          id
        }
      }`,
  }
  try {
    const userNewData = await queryHasura(loadUserFromHasura, token)
    const userOldData = await queryOldData(loadUserFrom8base)
    // if users exists in Hasura we return the data
    return {
      type:
        (userOldData?.user.id && userNewData?.User.length === 0 && 'OLD_USER') ||
        (!userOldData?.user && userNewData?.User.length === 0 && 'NEW_USER'),
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateUserCreatedPro = async ({ email, issuer, publicAddress }: ArtizenUser, token: string) => {
  const query = {
    query: `mutation {
        update_User(where: {
          email: {
            _eq:  "${email}"
          }
        } , _set: {
          issuer: "${issuer}", publicAddress: "${publicAddress}"
        }) {
          returning{
            firstName
            email
            bio
          }
        }
      }`,
  }
  try {
    await queryHasura(query, token)
  } catch (error) {
    console.log('error updateUserCreatedPro      ', error)
  }
}

export const createNewUser = async ({ issuer, publicAddress, email }: ArtizenUser, token: string) => {
  const query = {
    query: `mutation {
        insert_User_one( object: { email: "${email}", issuer: "${issuer}", publicAddress: "${publicAddress}" }) {
          email
        }
      }`,
  }
  try {
    await queryHasura(query, token)
  } catch (error) {
    console.log(error)
  }
}

const queryOldData = async (query: any) => {
  try {
    const res = await fetch(envString('NEXT_PUBLIC_8BASE_URL'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${envString('NEXT_PUBLIC_8BASE_GUEST_ACCESS_ID_TOKEN')}`,
      },
      body: JSON.stringify(query),
    })
    const { errors, data } = await res.json()
    if (errors) {
      throw errors
    }
    return data
  } catch (error) {
    console.log('queryHasura::: ')
    console.log(error)
    console.log('queryHasura-------- ')
  }
}

export const queryHasura = async (query: any, token: string) => {
  try {
    const res = await fetch(envString('NEXT_PUBLIC_HASURA_GRAPHQL_URL'), {
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
    console.log('queryHasura::: ')
    console.log(error)
    console.log('queryHasura-------- ')
  }
}

export const queryHasuraAsAdmin = async (
  query: any,
  adminSecret = envString('HASURA_ADMIN_SECRET'),
  uri = envString('NEXT_PUBLIC_HASURA_GRAPHQL_URL'),
) => {
  try {
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    headers.set('x-hasura-admin-secret', adminSecret || '')
    const res = await fetch(uri, {
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
    console.log('queryHasura::: ')
    console.log(error)
    console.log('queryHasura-------- ')
  }
}

export const getUserDataFromDataBase = async (issuer: string, token: string) => {
  const query = {
    query: `{
        User( where: {issuer: {_eq: "${issuer}"}}) {
          id
          email
          firstName
          lastName
          bio
          profileImage
          globalTitle
          globalRole
          website
          linkedinLink
          twitterLink
          company
        }
      }`,
  }
  try {
    const data = await queryHasura(query, token)
    return data?.User[0]
  } catch (error) {
    console.log(error)
    return error
  }
}
