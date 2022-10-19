import { gql } from '@apollo/client'

// TODO: missing some stuff
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $id: uuid
    $artizenHandle: String
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
        bio: $bio
        website: $website
        twitterHandle: $twitterHandle
        instagramHandle: $instagramHandle
        discordHandle: $discordHandle
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
        hideFromLeaderboard
        created_at
      }
    }
  }
`
