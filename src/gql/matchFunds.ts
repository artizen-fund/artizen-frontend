import { gql } from '@apollo/client'
import { MATCH_FUNDS } from '@gql'

export const GET_MATCH_FUNDS = gql`
  ${MATCH_FUNDS}
  query getMatchFunds($limit: Int, $where: MatchFunds_bool_exp, $order_by: [MatchFunds_order_by!]) {
    MatchFunds(limit: $limit, where: $where, order_by: $order_by) {
      ...MatchFund
    }
  }
`

export const CREATE_MATCH_FUNDS = gql`
  ${MATCH_FUNDS}
  mutation createMatchFunds($objects: [MatchFunds_insert_input!]!) {
    insert_MatchFunds(objects: $objects) {
      returning {
        ...MatchFund
      }
    }
  }
`
