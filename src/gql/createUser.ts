import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($publicAddress: String) {
    insert_Users_one(
      object: { publicAddress: $publicAddress }
      on_conflict: { constraint: Users_publicAddress_key, update_columns: [publicAddress] }
    ) {
      id
      publicAddress
    }
  }
`

export const CREATE_USERS = gql`
  mutation createUsers($objects: [Users_insert_input!]!) {
    insert_Users(objects: $objects) {
      returning {
        id
      }
    }
  }
`

export const UPDATE_USERS = gql`
  mutation updateUsers($_set: Users_set_input, $where: Users_bool_exp!) {
    update_Users(_set: $_set, where: $where) {
      returning {
        id
      }
    }
  }
`
