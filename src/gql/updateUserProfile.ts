import { gql } from '@apollo/client'

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $id: uuid
    $firstName: String
    $lastName: String
    $bio: String
    $email: String
    $twitterLink: String
    $website: String
  ) {
    update_User(
      where: { id: { _eq: $id } }
      _set: {
        firstName: $firstName
        lastName: $lastName
        bio: $bio
        email: $email
        twitterLink: $twitterLink
        website: $website
      }
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
