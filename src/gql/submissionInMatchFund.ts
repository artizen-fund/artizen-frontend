import { gql } from '@apollo/client'
import { SUBMISSION_IN_MATCH_FUND } from '@gql'

export const INSERT_SUBMISSION_IN_MATCH_FUND = gql`
  ${SUBMISSION_IN_MATCH_FUND}
  mutation insertSubmissionInMatchFunds($objects: [SubmissionInMatchFunds_insert_input!]!) {
    insert_SubmissionInMatchFunds(objects: $objects) {
      returning {
        ...SubmissionInMatchFund
      }
    }
  }
`
