import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const GET_SELF = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  query getSelf($publicAddress: String) {
    Users(limit: 1, where: { publicAddress: { _eq: $publicAddress } }) {
      ...UserPublic
      ...UserPrivate
    }
  }
`
