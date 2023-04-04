import { gql } from '@apollo/client'
import { OPEN_EDITIONS_COPIES } from '@gql'

export const SUBSCRIBE_OPEN_EDITIONS = gql`
  ${OPEN_EDITIONS_COPIES}
  subscription openEditions($where: OpenEditionCopies_bool_exp) {
    OpenEditionCopies(where: $where) {
      ...OpenEditionCopy
    }
  }
`

// note: I wrote this to find the top contributor
// but it may be more efficient than the query above

export const SUBSCRIBE_LEADERBOARD = gql`
  subscription leaderboard($where: Users_bool_exp) {
    Users(where: $where) {
      openEditionCopies {
        copies
        value
      }
      artizenHandle
      profileImage
    }
  }
`
