import { gql } from '@apollo/client'

export const SIDEBAR_DONATORS = gql`
  query SidebarDonators {
    exampleEntities(orderBy: totalDonations, first: 3, orderDirection: desc) {
      donation_amount
      donation_donor
      totalDonations
      OnChainUser {
        email
        firstName
        lastName
        profileImage
      }
    }
  }
`
