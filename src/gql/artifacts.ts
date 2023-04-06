import { gql } from '@apollo/client'
import { ARTIFACT } from './fragments'

export const INSERT_ARTIFACTS = gql`
  ${ARTIFACT}
  mutation insert_Artifacts($objects: [Artifacts_insert_input!]!) {
    insert_Artifacts(objects: $objects) {
      returning {
        ...Artifact
      }
    }
  }
`

export const UPDATE_ARTIFACTS = gql`
  ${ARTIFACT}
  mutation update_Artifacts_many($updates: [Artifacts_updates!]!) {
    update_Artifacts_many(updates: $updates) {
      returning {
        ...Artifact
      }
    }
  }
`
