import { gql } from '@apollo/client'
import { USER_PUBLIC, ARTIFACT } from '@gql'

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

export const GET_ADJACENT_GRANT = gql`
  fragment AdjacentGrantData on Grants {
    id
    date
    status
    blockchainId
    startingDate
    closingDate
  }

  query getAdjacentGrant($where: Grants_bool_exp, $order_by: [Grants_order_by!]) {
    Grants(where: $where, order_by: $order_by, limit: 1) {
      ...AdjacentGrantData
    }
  }
`

export const MEMBER = gql`
  ${USER_PUBLIC}
  fragment Member on ProjectMembers {
    id
    type
    user {
      ...UserPublic
    }
  }
`

export const PROJECT = gql`
  ${MEMBER}
  fragment Project on Projects {
    id
    impact
    impactTags
    logline
    description
    creationDate
    completionDate
    walletAddress
    title
    members {
      ...Member
    }
  }
`

export const GRANT = gql`
  ${ARTIFACT}
  ${PROJECT}

  fragment Grant on Grants {
    id
    date
    status
    blockchainId
    goal
    closingDate
    startingDate
    season
    goal
    submission {
      id
      artifacts {
        ...Artifact
      }
      project {
        ...Project
      }
    }
  }
`

export const LOAD_GRANTS = gql`
  ${GRANT}
  query loadGrants($where: Grants_bool_exp, $order_by: [Grants_order_by!], $limit: Int, $offset: Int) {
    Grants(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      ...Grant
    }
  }
`

export const UPDATE_GRANTS = gql`
  ${GRANT}
  mutation updateGrants($_set: Grants_set_input, $where: Grants_bool_exp!) {
    update_Grants(_set: $_set, where: $where) {
      returning {
        ...Grant
      }
    }
  }
`
