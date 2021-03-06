import { gql } from '@apollo/client'

export const CREATE_TOP_UP_WALLET = gql`
  mutation createTopUpWallet($data: TopUpWallet_insert_input!) {
    insert_TopUpWallet_one(object: $data) {
      id
      amount
      originFund
      state
      userId
      timestamp
    }
  }
`
