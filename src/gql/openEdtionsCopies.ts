import { gql } from '@apollo/client'
import { OPEN_EDITIONS_COPIES } from '@gql'

export const SUBSCRIBE_OPEN_EDITIONS = gql`
  ${OPEN_EDITIONS_COPIES}
  subscription openEditions($where: OpenEditionCopies_bool_exp) {
    OpenEditionCopies(where: $where) {
      ...OpenEditionCopy
    }
  }
`

export const LOAD_OPEN_EDITIONS = gql`
  ${OPEN_EDITIONS_COPIES}
  query openEditionsQuery($limit: Int, $where: OpenEditionCopies_bool_exp) {
    OpenEditionCopies(limit: $limit, where: $where) {
      ...OpenEditionCopy
    }
  }
`
