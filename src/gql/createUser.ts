import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const CREATE_USER = gql`
  mutation createUser($publicAddress: String) {
    insert_Users_one(object: { publicAddress: $publicAddress }) {
      id
      publicAddress
    }
  }
`

export const CREATE_USERS = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation createUsers($objects: [Users_insert_input!]!) {
    insert_Users(objects: $objects) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
