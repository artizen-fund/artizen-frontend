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
        sum {
          copies
        }
      }
    }
  }
`

export const USER_PUBLIC = gql`
  fragment UserPublic on Users {
    id
    publicAddress
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
    submissions {
      id
    }
    artifacts {
      ...Artifact
    }
    members {
      ...Member
    }
  }
`

export const OPEN_EDITIONS_COPIES = gql`
  fragment OpenEditionCopy on OpenEditionCopies {
    value
    copies
    user {
      id
      artizenHandle
      profileImage
    }
  }
`

export const SPONSORS = gql`
  fragment Sponsor on Sponsors {
    id
    name
    logotype
    url
    participation
  }
`

export const SPONSORS_IN_MATCH_FUND = gql`
  ${SPONSORS}
  fragment SponsorInMatchFund on SponsorInMatchFunds {
    id
    created_at
    updated_at
    contribution
    sponsor {
      ...Sponsor
    }
  }
`

export const SUBMISSION_IN_MATCH_FUND = gql`
  ${PROJECT}
  fragment SubmissionInMatchFund on SubmissionInMatchFunds {
    id
    submissionId
    matchFund {
      id
      name
    }
    submission {
      id
      project {
        ...Project
      }
    }
  }
`

export const SUBMISSION = gql`
  ${PROJECT}
  ${ARTIFACT}
  ${SUBMISSION_IN_MATCH_FUND}
  fragment Submission on Submissions {
    id
    projectId
    project {
      ...Project
    }
    artifacts {
      ...Artifact
    }
    matchFunds {
      ...SubmissionInMatchFund
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
    amountRaised
    matchFundPooled
    isClosed
    submissions {
      ...Submission
    }
  }
`

export const MATCH_FUNDS = gql`
  ${SPONSORS_IN_MATCH_FUND}
  ${SUBMISSION_IN_MATCH_FUND}
  fragment MatchFund on MatchFunds {
    id
    name
    goal
    projectRequirements
    url
    sponsorInMatchFunds {
      ...SponsorInMatchFund
    }
    submissions {
      ...SubmissionInMatchFund
    }
  }
`
