import { gql } from '@apollo/client'

export const typeDefs = gql`
  extend type Query {
    userToken: string
    userMetadata: {
			issuer: string
			publicAddress: string
			email: string
			phoneNumber: string
		}
  }
`

export const USER_METADATA = gql`
  query userMetadata {
    userMetadata @client
  }
`
