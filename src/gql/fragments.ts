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
  ${ARTIFACT}
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
    metadata
    artifacts {
      ...Artifact
    }
    members {
      ...Member
    }
  }
`
export const SUBMISSION = gql`
  ${PROJECT}
  ${ARTIFACT}
  fragment Submission on Submissions {
    id
    project {
      ...Project
    }
    artifacts {
      ...Artifact
    }
  }
`

export const SEASON = gql`
  ${SUBMISSION}
  fragment Season on Seasons {
    id
    title
    startingDate
    endingDate
    createdAt
    updateAt
    submissions {
      ...Submission
    }
  }
`
