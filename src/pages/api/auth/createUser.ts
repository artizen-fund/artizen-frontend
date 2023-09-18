import type { NextApiRequest, NextApiResponse } from 'next'
import { createApolloClient, assert } from '@lib'
import { CREATE_USER, GET_USERS_AND_CURATORS } from '@gql'
import * as jsonwebtoken from 'jsonwebtoken'
import { ICreateUserMutation, IGetUsersAndCuratorsQuery } from '@types'

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  //review the token here
  const { user } = req.body
  const apolloClient = createApolloClient()

  const publicAddress = user?.wallet?.address.toLowerCase()

  //   console.log('user::::::::::::     ', user)

  //User is only defined on server render, but the callback runs with client session calls

  const candidateUser = {
    id: undefined,
    isCurator: false,
  }

  const token = {
    id: undefined,
    iat: 0,
    exp: 0,
    ['https://hasura.io/jwt/claims']: {},
    user: {},
  }

  const userInDatabase = await apolloClient.query<IGetUsersAndCuratorsQuery>({
    query: GET_USERS_AND_CURATORS,
    variables: {
      where: {
        publicAddress: {
          _eq: publicAddress,
        },
      },
      whereCurator: {
        user: {
          publicAddress: {
            _eq: publicAddress,
          },
        },
      },
    },
  })

  if (userInDatabase.data?.Users.length === 0) {
    //Add user

    const newUserFromDB = await apolloClient.mutate<ICreateUserMutation>({
      mutation: CREATE_USER,
      variables: { publicAddress },
    })

    if (!newUserFromDB.data?.insert_Users_one?.id) {
      throw new Error('Could not retrieve ID from user in DB.')
    }

    candidateUser.id = newUserFromDB.data?.insert_Users_one?.id
  } else {
    candidateUser.id = userInDatabase.data?.Users[0].id
    candidateUser.isCurator = userInDatabase.data?.Users[0].curators.length > 0
  }

  token.id = candidateUser.id
  token.iat = Date.now() / 1000
  token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7

  if (candidateUser.isCurator) {
    token['https://hasura.io/jwt/claims'] = {
      'x-hasura-allowed-roles': ['user', 'curator'],
      'x-hasura-default-role': 'curator',
      'x-hasura-role': 'curator',
      'x-hasura-user-id': candidateUser.id,
    }
  }

  if (!candidateUser.isCurator) {
    token['https://hasura.io/jwt/claims'] = {
      'x-hasura-allowed-roles': ['user', 'curator'],
      'x-hasura-default-role': 'user',
      'x-hasura-role': 'user',
      'x-hasura-user-id': candidateUser.id,
    }
  }

  token.user = candidateUser

  const secret = assert(process.env.JWT_SECRET, 'JWT_SECRET')
  const encodedToken = jsonwebtoken.sign(token, secret, { algorithm: 'HS256' })

  return res.status(200).json({ token: encodedToken })
}

export default createUser
