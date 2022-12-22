import NextAuth, { User, Session, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Moralis from 'moralis'
import * as jsonwebtoken from 'jsonwebtoken'
import { JWT, JWTEncodeParams, JWTDecodeParams } from 'next-auth/jwt'
import { CREATE_USER, GET_USERS_AND_CURATORS } from '@gql'
import { ICreateUserMutation } from '@types'
import { assert, createApolloClient } from '@lib'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      console.log('user     ', user)
      if (user) {
        token.id = user.id
        token.iat = Date.now() / 1000
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7

        if (user.isCurator) {
          token['https://hasura.io/jwt/claims'] = {
            'x-hasura-allowed-roles': ['user', 'curator'],
            'x-hasura-default-role': 'curator',
            'x-hasura-role': 'curator',
            'x-hasura-user-id': user.id,
          }
        }

        if (!user.isCurator) {
          token['https://hasura.io/jwt/claims'] = {
            'x-hasura-allowed-roles': ['user', 'curator'],
            'x-hasura-default-role': 'user',
            'x-hasura-role': 'user',
            'x-hasura-user-id': user.id,
          }
        }

        token.user = user
      }
      return token
    },
    session: async ({ session, token }: { session: Session; token: JWT; user: User }) => {
      const secret = process.env.JWT_SECRET || ''
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
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'MoralisAuth',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      authorize: async credentials => {
        // NOTE: on_conflict in mutations, mutates records ID.
        // This invalidates external services that use the users ID as their references
        // We check for users in the DB firstly and only add them if they do not excit in the DB already
        const apolloClient = createApolloClient()

        try {
          const moralisApiKey = assert(process.env.MORALIS_API_KEY, 'MORALIS_API_KEY')
          await Moralis.start({ apiKey: moralisApiKey })

          console.log('authorize  starts  ', moralisApiKey)

          const { address, profileId, expirationTime } = (
            await Moralis.Auth.verify({
              message: credentials?.message || '',
              signature: credentials?.signature || '',
              network: 'evm',
            })
          ).raw

          console.log('authorize  address  ', address)
          console.log('authorize  profileId  ', profileId)

          //check if user is in database

          let userId = undefined
          let isCurator = undefined

          const userInDataBase = await apolloClient.query({
            query: GET_USERS_AND_CURATORS,
            variables: {
              where: {
                publicAddress: {
                  _eq: address.toLowerCase(),
                },
              },
              whereCurator: {
                user: {
                  publicAddress: {
                    _eq: address.toLowerCase(),
                  },
                },
              },
            },
          })

          if (userInDataBase.data?.Users.length === 0) {
            //Add user
            console.log('adding user  ::::')
            const userFromDB = await apolloClient.mutate<ICreateUserMutation>({
              mutation: CREATE_USER,
              variables: { publicAddress: address.toLowerCase() },
            })

            console.log('authorize  userFromDB  ', userFromDB)

            if (!userFromDB.data?.insert_Users_one?.id) {
              throw new Error('Could not retrieve ID from database upsert.')
            }

            userId = userFromDB.data?.insert_Users_one?.id
          } else {
            userId = userInDataBase.data?.Users[0].id
            isCurator = userInDataBase.data?.Users[0].curators.length > 0
          }

          const user = {
            id: userId,
            publicAddress: address.toLowerCase(),
            profileId,
            isCurator,
            expirationTime,
            signature: credentials?.signature,
          }

          console.log('authorize  user  ', user)

          return user

          // window.location.assign(`${window.location.protocol}//${window.location.host}/`)
        } catch (error) {
          console.error('error adding user in nextAuth authorize     ', error)
          return null
        }
      },
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
