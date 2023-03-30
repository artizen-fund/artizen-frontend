import { gql } from '@apollo/client'
import { ARTIFACT } from './fragments'

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

export const SUBSCRIBE_OPEN_EDITIONS = gql`
  fragment OpenEditionCopy on OpenEditionCopies {
    value
    copies
    user {
      id
      firstName
      lastName
      artizenHandle
      profileImage
    }
  }
  subscription openEditions($where: OpenEditionCopies_bool_exp) {
    OpenEditionCopies(where: $where) {
      ...OpenEditionCopy
    }
  }
`
