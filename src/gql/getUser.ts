import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const GET_USER = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  query getUser($publicAddress: String) {
    Users(where: { publicAddress: { _eq: $publicAddress } }) {
      ...UserPublic
      ...UserPrivate
    }
  }
`

export const GET_USERS = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  query getUsers($where: Users_bool_exp) {
    Users(where: $where) {
      ...UserPublic
      ...UserPrivate
    }
  }
`

export const GET_USERS_AND_CURATORS = gql`
  query getUsersAndCurators($where: Users_bool_exp, $whereCurator: Curators_bool_exp) {
    Users(where: $where) {
      id
      email
      publicAddress
      curators(where: $whereCurator) {
        id
      }
    }
  }
`

// note: should remove firstName, lastName form mockdata
export const mockGetUserData = [
  {
    request: {
      query: GET_USER,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        Users: [
          {
            id: '1',
            publicAddress: '0x0000000',
            email: 'rene@artizen.fund',
            firstName: 'René',
            lastName: 'Pinnell',
            profileImage: 'https://images.com/rene.jpg',
            createdAt: 'nene',
            twitterHandle: 'nene',
            discordHandle: 'nene',
            artizenHandle: 'nene',
            hideFromLeaderboard: false,
            website: 'https://artizen.fund',
            instagramHandle: 'nene',
            bannerImage: 'https://images.com/rene.jpg',
            bio: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
          },
        ],
      },
    },
  },
]
