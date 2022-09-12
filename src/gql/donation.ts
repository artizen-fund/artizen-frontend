import { gql } from 'graphql-tag'

export const CREATE_DONATION = gql`
  mutation createDonation($data: Donations_insert_input!) {
    insert_Donations_one(object: $data) {
      state
      type
      id
      amount
      userId
      txHash
      topUpId
    }
  }
`

export const GET_DONATION_VIA_TOP_UP_ID = gql`
  query loadDonationsByAttibute($attr: Donations_bool_exp) {
    Donations(where: $attr) {
      state
      type
      id
      amount
      userId
      txHash
      topUpId
    }
  }
`

export const GET_DONATIONS_FROM_BLOCKCHAIN = gql`
  query loadDonationsByAttibute($raffleId: String!) {
    Donation(raffleId: $raffleId) {
      donations {
        address
        amount
        block_hash
        userAddress
      }
    }
  }
`
