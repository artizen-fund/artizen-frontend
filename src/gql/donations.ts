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

export const UPDATE_DONATIONS = gql`
  mutation updateDonation($_set: Donations_set_input, $where: Donations_bool_exp!) {
    update_Donations(_set: $_set, where: $where) {
      returning {
        id
      }
    }
  }
`

//TODO: replace query for subscription after adding WS transporter to link
// https://www.apollographql.com/docs/react/api/link/apollo-link-subscriptions
export const SUBSCRIBE_DONATIONS = gql`
  fragment UserWithDonation on Users {
    donations(where: $whereDonations) {
      id
      amount
      grantId
    }
    artizenHandle
    profileImage
    publicAddress
  }

  subscription donations($where: Users_bool_exp, $whereDonations: Donations_bool_exp, $limit: Int!) {
    Users(where: $where, limit: $limit) {
      ...UserWithDonation
    }
  }
`
