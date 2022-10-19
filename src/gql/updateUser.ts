import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_USER = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateUser($email: String, $issuer: String, $publicAddress: String) {
    update_User(where: { email: { _eq: $email } }, _set: { issuer: $issuer, publicAddress: $publicAddress }) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
