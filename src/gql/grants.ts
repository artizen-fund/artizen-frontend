import { gql } from '@apollo/client'

export const CREATE_GRANTS = gql`
  mutation insert_Grants_one($grantVar: Grants_insert_input!) {
    insert_Grants_one(object: $grantVar) {
      id
      date
    }
  }
`

export const LOAD_GRANTS = gql`
  query loadGrants($where: Grants_bool_exp!) {
    Grants(where: $where) {
      id
      date
      status
    }
  }
`
