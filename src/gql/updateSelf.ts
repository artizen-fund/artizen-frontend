import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_SELF = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateSelf(
    $publicAddress: String
    $firstName: String
    $lastName: String
    $profileImage: String
    $twitterHandle: String
    $discordHandle: String
    $artizenHandle: String
    $email: String
    $hideFromLeaderboard: Boolean
    $website: String
    $instagramHandle: String
    $bannerImage: String
    $bio: String
  ) {
    update_Users(
      where: { publicAddress: { _eq: $publicAddress } }
      _set: {
        firstName: $firstName
        lastName: $lastName
        profileImage: $profileImage
        twitterHandle: $twitterHandle
        discordHandle: $discordHandle
        artizenHandle: $artizenHandle
        email: $email
        hideFromLeaderboard: $hideFromLeaderboard
        website: $website
        instagramHandle: $instagramHandle
        bannerImage: $bannerImage
        bio: $bio
      }
    ) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
