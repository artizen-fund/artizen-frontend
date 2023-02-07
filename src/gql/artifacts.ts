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

export const UPDATE_ARTIFACTS = gql`
  mutation update_Artifacts_many($updates: [Artifacts_updates!]!) {
    update_Artifacts_many(updates: $updates) {
      returning {
        id
      }
    }
  }
`
