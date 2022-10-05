import { gql } from '@apollo/client'

// TODO: It would be more efficient to return a sum(), but I don't know how to do that.

export const CHECK_FOR_EXISTING_ARTIZENHANDLE = gql`
  query checkForExistingArtizenHandle($where: User_bool_exp) {
    User(where: $where) {
      __typename
    }
  }
`
