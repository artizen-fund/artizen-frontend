import { gql } from '@apollo/client'

export const SIDEBAR_DONATORS = gql`
  query SidebarDonators {
    Donations(limit: 5, order_by: { amount: desc }) {
      User {
        firstName
        lastName
        profileImage
      }
      amount
    }
  }
`
