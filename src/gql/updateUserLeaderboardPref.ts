import { gql } from '@apollo/client'

export const UPDATE_USER_LEADERBOARD_PREF = gql`
  mutation UpdateUserLeaderboardPref($id: uuid, $hideFromLeaderboard: Boolean) {
    update_User(where: { id: { _eq: $id } }, _set: { hideFromLeaderboard: $hideFromLeaderboard }) {
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
