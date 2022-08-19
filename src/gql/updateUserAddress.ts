import { gql } from '@apollo/client'

export const UPDATE_USER_ADDRESS = gql`
  mutation UpdateUserAddress(
    $id: uuid
    $street1: String
    $city: String
    $state: String
    $country: String
    $zip: String
  ) {
    update_User(
      where: { id: { _eq: $id } }
      _set: { street1: $street1, city: $city, state: $state, country: $country, zip: $zip }
    ) {
      returning {
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
        street1
        city
        state
        zip
        country
      }
    }
  }
`
