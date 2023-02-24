import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const LOAD_SEASONS = gql`
  query loadGrants($limit: Int, $offset: Int) {
    Seasons(limit: $limit, offset: $offset) {
      id
    }
  }
`

export const CREATE_SEASON = gql`
  mutation createSeason($season: SeasonInput!) {
    createSeason(season: $season) {
      id
    }
  }
`
