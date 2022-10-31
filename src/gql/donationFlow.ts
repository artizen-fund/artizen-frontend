import { gql } from 'graphql-tag'

export const CREATE_DONATION_FLOW = gql`
  mutation createDonationFlows($data: DonationFlows_insert_input!) {
    insert_DonationFlows_one(object: $data) {
      id
      createAt
      updateAt
      raffleId
      state
      donationId
      swapId
      topUpId
    }
  }
`
export const UPDATE_DONATION_FLOW_WITH_SWAP = gql`
  mutation updateDonationFlowsWithSwap($state: String, $donationFlowId: uuid!, $swapId: uuid!) {
    update_DonationFlows_by_pk(pk_columns: { id: $donationFlowId }, _set: { state: $state, swapId: $swapId }) {
      id
      createAt
      updateAt
      raffleId
      state
      donationId
      swapId
      topUpId
    }
  }
`
export const UPDATE_DONATION_FLOW_WITH_TOPUP = gql`
  mutation updateDonationFlowsWithTopUp($state: String, $donationFlowId: uuid!, $topUpId: uuid!) {
    update_DonationFlows_by_pk(pk_columns: { id: $donationFlowId }, _set: { state: $state, topUpId: $topUpId }) {
      id
      createAt
      updateAt
      raffleId
      state
      donationId
      swapId
      topUpId
    }
  }
`

export const UPDATE_DONATION_FLOW_WITH_DONATION = gql`
  mutation updateDonationFlowsWithDonation($state: String, $donationFlowId: uuid!, $donationId: uuid!) {
    update_DonationFlows_by_pk(pk_columns: { id: $donationFlowId }, _set: { state: $state, topUpId: $donationId }) {
      id
      createAt
      updateAt
      raffleId
      state
      donationId
      swapId
      topUpId
    }
  }
`
