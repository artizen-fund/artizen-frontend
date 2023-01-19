// import NextAuth from 'next-auth'
import { MoralisNextAuthProvider } from '@moralisweb3/next'
//
// export default NextAuth({
//   providers: [MoralisNextAuthProvider()],
//   // adding user info to the user session object
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user
//       }
//       return token
//     },
//     async session({ session, token }) {
//       ;(session as { user: unknown }).user = token.user
//       return session
//     },
//   },
// })

import NextAuth, { User, Session, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Moralis from 'moralis'
import * as jsonwebtoken from 'jsonwebtoken'
import { JWT, JWTEncodeParams, JWTDecodeParams } from 'next-auth/jwt'
import { CREATE_USER, GET_USERS_AND_CURATORS } from '@gql'
import { ICreateUserMutation, IGetUsersAndCuratorsQuery } from '@types'
import { assert, createApolloClient } from '@lib'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      const userWRole = user as any
      const tokenRole = token as any

      console.log('userWRole  to start w  ', userWRole)
      console.log('tokenRole  to start w  ', tokenRole)

      const candidateUser = {
        id: userWRole?.id || tokenRole?.user?.id,
        publicAddress: userWRole?.address?.toLowerCase() || tokenRole?.user?.publicAddress?.toLowerCase(),
        profileId: userWRole?.profileId || tokenRole?.user?.profileId,
        isCurator: userWRole?.isCurator || tokenRole?.user?.isCurator,
      }

      console.log('candidateUser  ', candidateUser)

      if (!token.user) {
        console.log('token does not have user value::::   ', token)
        console.log('user   ', user)
        const apolloClient = createApolloClient()
        const userInDataBase = await apolloClient.query({
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

        candidateUser.id = userInDataBase.data?.Users[0].id
        candidateUser.isCurator = userInDataBase.data?.Users[0].curators.length > 0

        console.log('userInDataBase   ', userInDataBase.data?.Users)

        if (userInDataBase.data?.Users.length === 0) {
          //Add user

          const newUserFromDB = await apolloClient.mutate<ICreateUserMutation>({
            mutation: CREATE_USER,
            variables: { publicAddress: userWRole.address.toLowerCase() },
          })

          if (!newUserFromDB.data?.insert_Users_one?.id) {
            throw new Error('Could not retrieve ID from user in DB.')
          }

          console.log('newUserFromDB   ', newUserFromDB.data?.insert_Users_one)

          candidateUser.id = newUserFromDB.data?.insert_Users_one?.id
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

      console.log('final JWT return:::    ', token)

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
    MoralisNextAuthProvider(),
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: 'MoralisAuth',
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     message: {
    //       label: 'Message',
    //       type: 'text',
    //       placeholder: '0x0',
    //     },
    //     signature: {
    //       label: 'Signature',
    //       type: 'text',
    //       placeholder: '0x0',
    //     },
    //   },
    //   authorize: async credentials => {
    //     // NOTE: on_conflict in mutations, mutates records ID.
    //     // This invalidates external services that use the users ID as their references
    //     // We check for users in the DB firstly and only add them if they do not excit in the DB already
    //     const apolloClient = createApolloClient()

    //     try {
    //       const moralisApiKey = assert(process.env.MORALIS_API_KEY, 'MORALIS_API_KEY')
    //       await Moralis.start({ apiKey: moralisApiKey })

    //       console.log('authorize  starts  ', moralisApiKey)

    //       const { address, profileId, expirationTime } = (
    //         await Moralis.Auth.verify({
    //           message: credentials?.message || '',
    //           signature: credentials?.signature || '',
    //           network: 'evm',
    //         })
    //       ).raw

    //       //check if user is in database

    //       let userId = undefined
    //       let isCurator = undefined

    //       const userInDataBase = await apolloClient.query<IGetUsersAndCuratorsQuery>({
    //         query: GET_USERS_AND_CURATORS,
    //         variables: {
    //           where: {
    //             publicAddress: {
    //               _eq: address.toLowerCase(),
    //             },
    //           },
    //           whereCurator: {
    //             user: {
    //               publicAddress: {
    //                 _eq: address.toLowerCase(),
    //               },
    //             },
    //           },
    //         },
    //       })

    //       if (userInDataBase.data?.Users.length === 0) {
    //         //Add user

    //         const userFromDB = await apolloClient.mutate<ICreateUserMutation>({
    //           mutation: CREATE_USER,
    //           variables: { publicAddress: address.toLowerCase() },
    //         })

    //         if (!userFromDB.data?.insert_Users_one?.id) {
    //           throw new Error('Could not retrieve ID from database upsert.')
    //         }

    //         userId = userFromDB.data?.insert_Users_one?.id
    //       } else {
    //         userId = userInDataBase.data?.Users[0].id
    //         isCurator = userInDataBase.data?.Users[0].curators.length > 0
    //       }

    //       const user = {
    //         id: userId,
    //         publicAddress: address.toLowerCase(),
    //         profileId,
    //         isCurator,
    //         expirationTime,
    //         signature: credentials?.signature,
    //       }

    //       console.log('authorize  user  ', user)

    //       return user
    //     } catch (error) {
    //       console.error('error adding user in nextAuth authorize     ', error)
    //       return null
    //     }
    //   },
    // }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
