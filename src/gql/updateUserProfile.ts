import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_USER_PROFILE = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
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
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
