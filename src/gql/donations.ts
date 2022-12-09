import { gql } from '@apollo/client'

export const INSERT_DONATIONS = gql`
  mutation addDonation($objects: [Donations_insert_input!]!) {
    insert_Donations(objects: $objects) {
      returning {
        id
      }
    }
  }
`

export const SUBSCRIBE_DONATIONS = gql`
  mutation updateGrant($_set: Grants_set_input, $where: Grants_bool_exp!) {
    update_Grants(_set: $_set, where: $where) {
      returning {
        id
        goal
        blockchainId
      }
    }
  }

  subscription donations {
    Donations(
      where: {
        _and: [
          {
            grantId: { _eq: "84894c9a-f533-401b-8080-c43ffb6cc2f9" }
            userId: { _eq: "8e849aa3-7521-4bd4-80df-82446c513ca2" }
            status: { _eq: "confirmed" }
          }
        ]
      }
    ) {
      id
      user {
        id
        artizenHandle
        profileImage
      }
    }
  }
`
