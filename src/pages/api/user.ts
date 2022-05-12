import jwt from 'jsonwebtoken'
import { setTokenCookie } from '@lib'
import { createNewToken, getUserDataFromDataBase } from '../../lib/utilsServer'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.cookies.token) {
      console.log('Error: Token not found in cookies.')
      return res.json({})
    }

    const { token } = req.cookies
    const jwtUser = jwt.verify(token, process.env.JWT_SECRET!) as ArtizenUser
    if (!jwtUser.issuer) throw 'Bad JWT payload.'

    // Refresh the JWT for the user each time they send a request to /user so they only get logged out after SESSION_LENGTH_IN_DAYS of inactivity
    const newToken = createNewToken(jwtUser)

    // Send JWT in response to the client, necessary for API requests to Hasura
    jwtUser.token = newToken
    if (!newToken) {
      throw 'Error creating token'
    }
    setTokenCookie(res, newToken)

    const userFromDatabase = await getUserDataFromDataBase(jwtUser.issuer, token)
    if (!userFromDatabase) throw 'Error retrieving user from database.'

    res.status(200).json({
      ...jwtUser,
      ...userFromDatabase,
      // ...(process.env.LOCALNODE && {
      //   publicAddress: process.env.POLYGON_LOCAL_ADDRESS,
      // }),
    })
  } catch (error) {
    res.status(200).json({})
  }
}

// async function queryHasura(query, token) {
//   console.log('token     ', JSON.stringify(query))
//   console.log('token   ', token)
//   try {
//     const res = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(query),
//     })
//     const { data } = await res.json({})

//     return data
//   } catch (error) {
//     console.log(error)

//     return error
//   }
// }

// async function getUserDataFromDataBase(issuer, token) {
//   const query = {
//     query: `{
//       User( where: {issuer: {_eq: "${issuer}"}}) {
//         email
//         firstName
//         lastName
//         bio
//         profileImage
//         globalTitle
//         globalRole
//         website
//         linkedinLink
//         twitterLink
//         company
//         projects {
//           id
//         }
//       }
//     }`,
//   }

//   try {
//     const data = await queryHasura(query, token)

//     console.log('data?.users in here  ', data?.users)

//     return data?.users[0]
//   } catch (error) {
//     console.log(error)

//     return error
//   }
// }
