import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_NEW_USER_PROFILE = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateNewUserProfile(
    $id: uuid
    $firstName: String
    $lastName: String
    $artizenHandle: String
    $profileImage: String
    $hideFromLeaderboard: Boolean
  ) {
    update_User(
      where: { id: { _eq: $id } }
      _set: {
        firstName: $firstName
        lastName: $lastName
        artizenHandle: $artizenHandle
        profileImage: $profileImage
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
