import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($email: String, $publicAddress: String) {
    insert_Users_one(object: { email: $email, publicAddress: $publicAddress }) {
      id
      email
    }
  }
`
