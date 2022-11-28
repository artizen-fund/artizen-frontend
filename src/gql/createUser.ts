import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($publicAddress: String) {
    insert_Users_one(
      object: { publicAddress: $publicAddress }
      on_conflict: { constraint: Users_publicAddress_key, update_columns: [] }
    ) {
      id
      publicAddress
    }
  }
`
