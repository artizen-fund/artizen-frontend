import { gql } from '@apollo/client'

export const USER_PRIVATE = gql`
  fragment UserPrivate on User {
    email
    street1
    city
    state
    zip
    country
  }
`

export const USER_PUBLIC = gql`
  fragment UserPublic on User {
    id
    publicAddress
    firstName
    lastName
    bio
    profileImage
    globalTitle
    globalRole
    company
    website
    linkedinLink
    twitterLink
    twitterHandle
    instagramHandle
    discordHandle
    bannerImage
    artizenHandle
    hideFromLeaderboard
    created_at
  }
`
