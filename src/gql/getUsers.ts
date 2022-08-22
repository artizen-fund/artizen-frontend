import { gql } from '@apollo/client'

export const GET_USERS_BY_PUBLIC_ADDRESSES = gql`
  query getUsersByPublicAddress($addresses: [String!]) {
    User(where: { publicAddress: { _in: $addresses } }) {
      id
      email
      firstName
      lastName
      profileImage
      publicAddress
    }
  }
`
