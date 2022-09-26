import { gql } from '@apollo/client'

export const UPDATE_NEW_USER_PROFILE = gql`
  mutation UpdateNewUserProfile($id: uuid, $firstName: String, $lastName: String) {
    update_User(where: { id: { _eq: $id } }, _set: { firstName: $firstName, lastName: $lastName }) {
      returning {
        id
        firstName
        lastName
      }
    }
  }
`