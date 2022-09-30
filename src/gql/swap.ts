import { gql } from 'graphql-tag'

export const CREATE_SWAP = gql`
  mutation createSwap($data: Swaps_insert_input!) {
    insert_Swaps_one(object: $data) {
      state
      id
      amount
      userId
      txHash
    }
  }
`

export const GET_LATEST_SWAP_VIA_ATTRIBUTE = gql`
  query loadLatestSwap($attr: Swaps_bool_exp) {
    Swaps(where: $attr, order_by: { timestamp: desc }, limit: 1) {
      amount
      id
      state
      timestamp
      txHash
      userId
    }
  }
`

export const UPDATE_SWAP_STATE = gql`
  mutation updateSwapStateById($state: String, $swapId: uuid!) {
    update_Swaps_by_pk(pk_columns: { id: $swapId }, _set: { state: $state }) {
      id
    }
  }
`
