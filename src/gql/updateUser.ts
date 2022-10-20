import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_USER_FROM_SERVER = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateUserServer($email: String, $issuer: String, $publicAddress: String) {
    update_User(where: { email: { _eq: $email } }, _set: { issuer: $issuer, publicAddress: $publicAddress }) {
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
  mutation UpdateUser(
    $id: uuid!
    $firstName: String
    $lastName: String
    $street1: String
    $city: String
    $state: String
    $country: String
    $zip: String
    $bio: String
    $email: String
    $website: String
    $twitterHandle: String
    $instagramHandle: String
    $discordHandle: String
    $artizenHandle: String
    $profileImage: String
    $bannerImage: String
    $hideFromLeaderboard: Boolean
  ) {
    update_User(
      where: { id: { _eq: $id } }
      _set: {
        firstName: $firstName
        lastName: $lastName
        street1: $street1
        city: $city
        state: $state
        country: $country
        zip: $zip
        bio: $bio
        website: $website
        twitterHandle: $twitterHandle
        instagramHandle: $instagramHandle
        discordHandle: $discordHandle
        artizenHandle: $artizenHandle
        profileImage: $profileImage
        bannerImage: $bannerImage
        hideFromLeaderboard: $hideFromLeaderboard
      }
    ) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
