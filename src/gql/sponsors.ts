import { gql } from '@apollo/client'
import { SPONSORS } from '@gql'

export const GET_MATCH_FUNDS = gql`
  ${SPONSORS}
  query getSponsors($limit: Int, $where: Sponsors_bool_exp, $order_by: [Sponsors_order_by!]) {
    Sponsors(limit: $limit, where: $where, order_by: $order_by) {
      ...Sponsor
    }
  }
`
