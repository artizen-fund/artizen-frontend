import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const LOAD_SEASONS = gql`
  query loadGrants($limit: Int, $offset: Int) {
    Seasons(limit: $limit, offset: $offset) {
      id
      title
      startingDate
      endingDate
    }
  }
`

export const INSERT_SEASONS = gql`
  mutation insertSeasons($objects: [Seasons_insert_input!]!) {
    insert_Seasons(objects: $objects) {
      returning {
        id
      }
    }
  }
`
