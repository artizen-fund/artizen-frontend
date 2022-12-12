import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_USER_FROM_SERVER = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateUserServer($email: String, $publicAddress: String) {
    update_Users(where: { email: { _eq: $email } }, _set: { publicAddress: $publicAddress }) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`

export const UPDATE_USER = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateUsers(
    $id: uuid!
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
      where: { id: { _eq: $id } }
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
