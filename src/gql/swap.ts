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
