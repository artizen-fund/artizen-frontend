import { gql } from '@apollo/client'
import { SUBMISSION } from './fragments'

export const INSERT_SUBMISSION = gql`
  ${SUBMISSION}
  mutation insert_Submissions($objects: [Submissions_insert_input!]!) {
    insert_Submissions(objects: $objects) {
      returning {
        ...Submission
      }
    }
  }
`

export const LOAD_SUBMISSIONS = gql`
  ${SUBMISSION}
  query load_Submissions($limit: Int, $where: Submissions_bool_exp, $order_by: [Submissions_order_by!], $offset: Int) {
    Submissions(limit: $limit, where: $where, order_by: $order_by, offset: $offset) {
      ...Submission
    }
  }
`
