import { gql } from '@apollo/client'

export const CHECK_USER = gql`
  query checkUser($email: String) {
    Users(where: { email: { _eq: $email } }) {
      id
      email
    }
  }
`
