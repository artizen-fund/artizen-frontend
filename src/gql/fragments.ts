import { gql } from '@apollo/client'

export const USER_PRIVATE = gql`
  fragment UserPrivate on Users {
    email
  }
`

export const ARTIFACT = gql`
  fragment Artifact on Artifacts {
    id
    name
    description
    artwork
    video
    edition
    blockchainAddress
    dateMinting
    token
    createdAt
  }
`

export const USER_PUBLIC = gql`
  fragment UserPublic on Users {
    id
    publicAddress
    firstName
    lastName
    profileImage
    createdAt
    twitterHandle
    discordHandle
    artizenHandle
    hideFromLeaderboard
    website
    instagramHandle
    bannerImage
    bio
  }
`
