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

export const SUBSCRIBE_SEASONS = gql`
  ${SEASON}
  subscription subscribeSeasons($limit: Int, $offset: Int, $where: Seasons_bool_exp, $order_by: [Seasons_order_by!]) {
    Seasons(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
      ...Season
    }
  }
`

export const GET_SEASON_FOR_TIME = gql`
  query seasonForTime($where: Seasons_bool_exp, $order_by: [Seasons_order_by!]) {
    Seasons(limit: 1, where: $where, order_by: $order_by) {
      id
      index
      endingDate
      startingDate
      amountRaised
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

export const UPDATE_SEASONS = gql`
  ${SEASON}
  mutation updateSeasons($where: Seasons_bool_exp!, $_set: Seasons_set_input) {
    update_Seasons(where: $where, _set: $_set) {
      returning {
        ...Season
      }
    }
  }
`
