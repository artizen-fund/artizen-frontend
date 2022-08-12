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
export const GET_TOP_UP_WALLET_VIA_TRANSFER_ID = gql`
  query loadTopUpWalletByAttibute($attr: TopUpWallet_bool_exp) {
    TopUpWallet(where: $attr) {
      state
      originFund
      id
      amount
      timestamp
      userId
      txHash
      fee
      transferId
    }
  }
`
