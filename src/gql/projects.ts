import { gql } from '@apollo/client'
import { PROJECT } from '@gql'

export const INSERT_PROJECTS = gql`
  ${PROJECT}
  mutation insert_Projects($objects: [Projects_insert_input!]!) {
    insert_Projects(objects: $objects) {
      returning {
        ...Project
      }
    }
  }
`

export const GET_PROJECTS = gql`
  ${PROJECT}
  query projects($limit: Int, $where: Projects_bool_exp) {
    Projects(limit: $limit, where: $where) {
      ...Project
    }
  }
`
