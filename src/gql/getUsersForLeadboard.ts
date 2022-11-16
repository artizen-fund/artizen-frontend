import { gql } from '@apollo/client'
import { USER_PUBLIC } from '@gql'

export const GET_USERS_FOR_LEADERBOARD = gql`
  ${USER_PUBLIC}
  query getUsersForLeadboard($addresses: [String!]) {
    Users(where: { _and: [{ publicAddress: { _in: $addresses } }, { hideFromLeaderboard: { _neq: true } }] }) {
      ...UserPublic
    }
  }
`
