import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_USER_ADDRESS = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
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
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
