import { gql } from '@apollo/client'
import { SEASON } from './fragments'

export const LOAD_SEASONS = gql`
  ${SEASON}
  query loadSeasons($limit: Int, $offset: Int) {
    Seasons(limit: $limit, offset: $offset) {
<<<<<<< HEAD
      ...Season
=======
      id
      title
      startingDate
      endingDate
>>>>>>> 5d3c6163 (added season form)
    }
  }
`

export const INSERT_SEASONS = gql`
  mutation insertSeasons($objects: [Seasons_insert_input!]!) {
<<<<<<< HEAD
    ${SEASON}
    insert_Seasons(objects: $objects) {
      returning {
        ...Season
=======
    insert_Seasons(objects: $objects) {
      returning {
        id
>>>>>>> 5d3c6163 (added season form)
      }
    }
  }
`
