import { gql } from '@apollo/client'

export const CREATE_PROJECT = gql`
  mutation insert_Projects_one($object: Projects_insert_input!) {
    insert_Projects_one(object: $object) {
      id
    }
  }
`
