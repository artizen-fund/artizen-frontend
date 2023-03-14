import { gql } from '@apollo/client'
import { SEASON } from './fragments'

export const LOAD_SEASONS = gql`
  ${SEASON}
  query loadSeasons($limit: Int, $offset: Int, $where: Seasons_bool_exp, $order_by: [Seasons_order_by!]) {
    Seasons(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
      ...Season
    }
  }
`

export const INSERT_SEASONS = gql`
  ${SEASON}
  mutation insertSeasons($objects: [Seasons_insert_input!]!) {
    insert_Seasons(objects: $objects) {
      returning {
        ...Season
      }
    }
  }
`
