import { gql } from '@apollo/client'
import { USER_PUBLIC, USER_PRIVATE } from '@gql'

export const INSERT_PROJECTS = gql`
  mutation insert_Projects($objects: [Projects_insert_input!]!) {
    insert_Projects(objects: $objects) {
      returning {
        id
      }
    }
  }
`

export const GET_PROJECTS = gql`
  ${USER_PUBLIC}
  ${USER_PRIVATE}
  query projects($limit: Int, $where: Projects_bool_exp) {
    Projects(limit: $limit, where: $where) {
      id
      members {
        id
        type
        user {
          ...UserPublic
          ...UserPrivate
        }
      }
    }
  }
`
