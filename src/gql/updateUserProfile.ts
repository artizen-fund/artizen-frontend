import { gql } from '@apollo/client'

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $id: uuid
    $artizenHandle: String
    $firstName: String
    $lastName: String
    $bio: String
    $email: String
    $website: String
    $twitterHandle: String
    $instagramHandle: String
    $discordHandle: String
  ) {
    update_User(
      where: { id: { _eq: $id } }
      _set: {
        artizenHandle: $artizenHandle
        firstName: $firstName
        lastName: $lastName
        bio: $bio
        email: $email
        website: $website
        twitterHandle: $twitterHandle
        instagramHandle: $instagramHandle
        discordHandle: $discordHandle
      }
    ) {
      returning {
        id
        email
        artizenHandle
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
        twitterHandle
        instagramHandle
        discordHandle
      }
    }
  }
`
