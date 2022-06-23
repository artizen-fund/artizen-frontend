import { gql } from '@apollo/client'

export const CHECK_USER = gql`
  query checkUser($email: String) {
    User(where: { email: { _eq: $email } }) {
      email
      issuer
    }
  }
`
