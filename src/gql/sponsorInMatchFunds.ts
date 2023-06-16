import { gql } from '@apollo/client'
import { SPONSORS_IN_MATCH_FUND } from '@gql'

export const INSERT_SPONSOR_IN_MATCH = gql`
  ${SPONSORS_IN_MATCH_FUND}
  mutation insertSponsorInMatchFunds($objects: [SponsorInMatchFunds_insert_input!]!) {
    insert_SponsorInMatchFunds(objects: $objects) {
      returning {
        ...SponsorInMatchFund
      }
    }
  }
`
