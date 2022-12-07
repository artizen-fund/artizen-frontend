import { gql } from '@apollo/client'

export const INSERT_ARTIFACTS = gql`
  mutation insert_Artifacts($objects: [Artifacts_insert_input!]!) {
    insert_Artifacts(objects: $objects) {
      returning {
        id
      }
    }
  }
`