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
  fragment GrantsWithProjectAndDonations on Grants {
    id
    date
    status
    blockchainId
    goal
    closingDate
    season
    goal
    submission {
      id
      artifact {
        id
        name
        artworkPatron
        artworkCreator
        artworkCommunity
        videoPatron
        videoCreator
        videoCommunity
      }
      project {
        id
        impact
        longline
        description
        creationDate
        completionDate
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
          }
        }
        title
      }
    }
    donations {
      amount
      user {
        id
        profileImage
        artizenHandle
      }
    }
  }

  query loadGrants($where: Grants_bool_exp!) {
    Grants(where: $where) {
      ...GrantsWithProjectAndDonations
    }
  }
`
