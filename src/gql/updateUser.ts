import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_USER_FROM_SERVER = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateUserServer($email: String, $publicAddress: String) {
    update_Users(where: { email: { _eq: $email } }, _set: { publicAddress: $publicAddress }) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
