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
