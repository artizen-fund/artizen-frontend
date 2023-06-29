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

export const UPDATE_SUBMISSION_IN_MATCH_FUND = gql`
  ${SUBMISSION_IN_MATCH_FUND}
  mutation updateSubmissionInMatchFunds(
    $where: SubmissionInMatchFunds_bool_exp!
    $_set: SubmissionInMatchFunds_set_input
  ) {
    update_SubmissionInMatchFunds(where: $where, _set: $_set) {
      returning {
        ...SubmissionInMatchFund
      }
    }
  }
`
