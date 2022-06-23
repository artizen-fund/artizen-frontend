import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($email: String, $issuer: String, $publicAddress: String) {
    insert_User_one(object: { email: $email, issuer: $issuer, publicAddress: $publicAddress }) {
      email
    }
  }
`
