import { gql } from '@apollo/client'

export const SIDEBAR_DONATORS = gql`
  query SidebarDonators {
    onChainDonations: onchain {
      donations(orderBy: amount, first: 3, orderDirection: desc) {
        amount
        from
        cycleTotalDonation
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
