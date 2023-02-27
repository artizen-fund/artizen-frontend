import { gql } from '@apollo/client'
import { SEASON } from './fragments'

export const LOAD_SEASONS = gql`
  ${SEASON}
  query loadSeasons($limit: Int, $offset: Int) {
    Seasons(limit: $limit, offset: $offset) {
      ...Season
    }
  }
`

export const INSERT_SEASONS = gql`
  mutation insertSeasons($objects: [Seasons_insert_input!]!) {
    ${SEASON}
    insert_Seasons(objects: $objects) {
      returning {
        ...Season
      }
    }
  }
`
