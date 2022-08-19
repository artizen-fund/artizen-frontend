import { gql } from '@apollo/client'

export const SIDEBAR_DONATORS = gql`
  query SidebarDonators {
    onChainDonations: onchain {
      donations(orderBy: timestamp, orderDirection: desc) {
        amount
        from
        cycleTotalDonation
        timestamp
        User {
          email
          firstName
          lastName
          profileImage
        }
      }
    }
  }
`
