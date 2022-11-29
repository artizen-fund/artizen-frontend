import { gql } from '@apollo/client'

// TODO: It would be more efficient to return a sum(), but I don't know how to do that.

export const CHECK_FOR_EXISTING_ARTIZENHANDLE = gql`
  query checkForExistingArtizenHandle($where: Users_bool_exp) {
    Users(where: $where) {
      __typename
    }
  }
`
