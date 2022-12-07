import { gql } from '@apollo/client'

export const INSERT_GRANTS = gql`
  mutation insert_Grants($objects: [Grants_insert_input!]!) {
    insert_Grants(objects: $objects) {
      returning {
        id
        date
      }
    }
  }
`

export const LOAD_GRANTS = gql`
  query loadGrants($where: Grants_bool_exp!) {
    Grants(where: $where) {
      id
      date
      status
      blockchainId
    }
  }
`
