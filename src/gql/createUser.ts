import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($publicAddress: String) {
    insert_Users_one(object: { publicAddress: $publicAddress }) {
      id
      publicAddress
    }
  }
`
