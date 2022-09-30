import { gql } from '@apollo/client'

export const UPDATE_NEW_USER_PROFILE = gql`
  mutation UpdateNewUserProfile(
    $id: uuid
    $firstName: String
    $lastName: String
    $artizenHandle: String
    $profileImage: String
  ) {
    update_User(
      where: { id: { _eq: $id } }
      _set: { firstName: $firstName, lastName: $lastName, artizenHandle: $artizenHandle, profileImage: $profileImage }
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
        company
        street1
        city
        state
        zip
        country
        website
        linkedinLink
        twitterLink
        twitterHandle
        instagramHandle
        discordHandle
        bannerImage
        artizenHandle
        created_at
      }
    }
  }
`
