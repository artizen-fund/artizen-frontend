import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const UPDATE_USER_LEADERBOARD_PREF = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  mutation UpdateUserLeaderboardPref($id: uuid, $hideFromLeaderboard: Boolean) {
    update_User(where: { id: { _eq: $id } }, _set: { hideFromLeaderboard: $hideFromLeaderboard }) {
      returning {
        ...UserPublic
        ...UserPrivate
      }
    }
  }
`
