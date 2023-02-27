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

export const MEMBER = gql`
  ${USER_PUBLIC}
  fragment Member on ProjectMembers {
    id
    type
    user {
      ...UserPublic
    }
  }
`

export const PROJECT = gql`
  ${MEMBER}
  fragment Project on Projects {
    id
    impact
    impactTags
    logline
    description
    creationDate
    completionDate
    walletAddress
    title
    members {
      ...Member
    }
  }
`
export const SEASON = gql`
  fragment Season on Seasons {
    id
    title
    startingDate
    endingDate
    createdAt
    updateAt
  }
`
