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

export const LOAD_GRANTS = gql`
  fragment Artifact on Artifacts {
    id
    name
    description
    artwork
    video
    edition
    blockchainAddress
    dateMinting
    token
    createdAt
  }
  fragment User on Users {
    id
    firstName
    lastName
    artizenHandle
    twitterHandle
    website
    profileImage
    publicAddress
  }
  fragment Member on ProjectMembers {
    id
    type
    user {
      ...User
    }
  }
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

  query loadGrants($where: Grants_bool_exp, $order_by: [Grants_order_by!], $limit: Int, $offset: Int) {
    Grants(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      ...Grant
    }
  }
`

export const UPDATE_GRANTS = gql`
  mutation updateGrants($_set: Grants_set_input, $where: Grants_bool_exp!) {
    update_Grants(_set: $_set, where: $where) {
      returning {
        id
        status
      }
    }
  }
`
