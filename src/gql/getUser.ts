import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUser($issuer: String) {
    User(where: { issuer: { _eq: $issuer } }) {
      id
      email
      firstName
      lastName
      bio
      profileImage
      globalTitle
      globalRole
      website
      linkedinLink
      twitterLink
      company
    }
  }
`
