import { gql } from '@apollo/client'

export const CREATE_GRANTS = gql`
  mutation insert_Grants_one($grantVar: Grants_insert_input!) {
    insert_Grants_one(object: $grantVar) {
      id
      startingDate
    }
  }
`
