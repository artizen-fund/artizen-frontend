import { gql } from '@apollo/client'
import { USER_PUBLIC } from '@gql'

export const GET_USERS_BY_PUBLIC_ADDRESSES = gql`
  ${USER_PUBLIC}
  query getUsersByPublicAddress($addresses: [String!]) {
    User(where: { publicAddress: { _in: $addresses } }) {
      ...UserPublic
    }
  }
`
