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
    openEditionCopies_aggregate {
      aggregate {
        count(columns: value)
      }
    }
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
    externalLink
    claimed
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
    title
    titleURL
    logline
    description
    creationDate
    completionDate
    walletAddress
    metadata
    impactTags
    impact
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
    createdAt
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
    index
    submissions {
      ...Submission
    }
  }
`
