import { gql } from '@apollo/client'

export const INSERT_PROJECTS_MEMBERS = gql`
  mutation insert_ProjectMembers($objects: [ProjectMembers_insert_input!]!) {
    insert_ProjectMembers(objects: $objects) {
      returning {
        id
      }
    }
  }
`
