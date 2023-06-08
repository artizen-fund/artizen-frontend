import { MoralisNextAuthProvider } from '@moralisweb3/next'
import NextAuth, { User, Session, NextAuthOptions } from 'next-auth'
import * as jsonwebtoken from 'jsonwebtoken'
import { JWT, JWTEncodeParams, JWTDecodeParams } from 'next-auth/jwt'
import { CREATE_USER, GET_USERS_AND_CURATORS } from '@gql'
import { ICreateUserMutation, IGetUsersAndCuratorsQuery } from '@types'
import { createApolloClient, assert } from '@lib'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      const userWithRole = user as any
      const tokenRole = token as any

      //User is only defined on server render, but the callback runs with client session calls

      const candidateUser = {
        id: userWithRole?.id || tokenRole?.user?.id,
        publicAddress: userWithRole?.address?.toLowerCase() || tokenRole?.user?.publicAddress?.toLowerCase(),
        profileId: userWithRole?.profileId || tokenRole?.user?.profileId,
        isCurator: userWithRole?.isCurator || tokenRole?.user?.isCurator,
      }

      if (!token.user) {
        const apolloClient = createApolloClient()
        const userInDatabase = await apolloClient.query<IGetUsersAndCuratorsQuery>({
          query: GET_USERS_AND_CURATORS,
          variables: {
            where: {
              publicAddress: {
                _eq: candidateUser.publicAddress,
              },
            },
            whereCurator: {
              user: {
                publicAddress: {
                  _eq: candidateUser.publicAddress,
                },
              },
            },
          },
        })

        if (userInDatabase.data?.Users.length === 0) {
          //Add user

          const newUserFromDB = await apolloClient.mutate<ICreateUserMutation>({
            mutation: CREATE_USER,
            variables: { publicAddress: userWithRole.address.toLowerCase() },
          })

          if (!newUserFromDB.data?.insert_Users_one?.id) {
            throw new Error('Could not retrieve ID from user in DB.')
          }

          candidateUser.id = newUserFromDB.data?.insert_Users_one?.id
        } else {
          candidateUser.id = userInDatabase.data?.Users[0].id
          candidateUser.isCurator = userInDatabase.data?.Users[0].curators.length > 0
        }
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
      return token
    },
    session: async ({ session, token }: { session: Session; token: JWT; user: User }) => {
      const secret = assert(process.env.JWT_SECRET, 'JWT_SECRET')
      console.log('secret here:::::  ', secret)
      const encodedToken = jsonwebtoken.sign(token, secret, { algorithm: 'HS256' })

      return {
        ...session,
        user: token.user,
        token: encodedToken,
      }
    },
  },
  jwt: {
    encode: ({ secret, token }: JWTEncodeParams) => {
      const encodedToken = jsonwebtoken.sign(token as object, secret, {
        algorithm: 'HS256',
      })
      console.log('from encode')
      return encodedToken
    },
    decode: async ({ secret, token }: JWTDecodeParams) => {
      if (!token) {
        throw new Error('Error decoding JWT: missing token')
      }
      const decodedToken = jsonwebtoken.verify(token, secret, {
        algorithms: ['HS256'],
      })
      return decodedToken as JWT
    },
  },
  debug: true,
  providers: [MoralisNextAuthProvider()],
}

export default NextAuth(authOptions)
