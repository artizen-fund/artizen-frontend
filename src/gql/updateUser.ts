import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String, $issuer: String, $publicAddress: String) {
    update_User(where: { email: { _eq: $email } }, _set: { issuer: $issuer, publicAddress: $publicAddress }) {
      returning {
        firstName
        email
        bio
      }
    }
  }
`
