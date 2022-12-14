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
  fragment GrantsWithProject on Grants {
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
        id
        name
        description
        artwork
        video
        edition
        blockchainAddress
        dateMinting
        token
      }
      project {
        id
        impact
        longline
        description
        creationDate
        completionDate
        walletAddress
        title
        members {
          id
          type
          user {
            id
            firstName
            lastName
            artizenHandle
            twitterHandle
            website
            profileImage
            publicAddress
          }
        }
      }
    }
  }

  query loadGrants($where: Grants_bool_exp, $order_by: [Grants_order_by!], $limit: Int) {
    Grants(where: $where, order_by: $order_by, limit: $limit) {
      ...GrantsWithProject
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
