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

export const UPSERT_USERS = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpsertUsers($objects: [Users_insert_input!]!, $on_conflict: Users_on_conflict) {
    insert_Users(objects: $objects, on_conflict: $on_conflict) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`

export const UPDATE_USERS = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateUsersF($_set: Users_set_input, $where: Users_bool_exp!) {
    update_Users(where: $where, _set: $_set) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
//TODO: Remove this mutation and use the one above which is more flexible
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
