import { gql } from '@apollo/client'

export const INSERT_PROJECTS = gql`
  mutation insert_Projects($objects: [Projects_insert_input!]!) {
    insert_Projects(objects: $objects) {
      returning {
        id
      }
    }
  }
`
