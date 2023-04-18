import { PinataPinResponse } from '@pinata/sdk'
import { IProjectFragment, ISubmissionFragment, ISeasonFragment, IArtifactFragment } from '@types'

const mockSeason: ISeasonFragment = {
 title: 'Season title',
  startingDate: 17/04/2023,
  endingDate: 17/05/2023,
  createdAt: 1681808956,
  updateAt: 1684400956,
  index: 124,
  submissions: {
    __typename: 'Submissions',
    id: 124,
    createdAt: 1681808956,
    projectId: 124,
    project:
      {
          __typename: 'Projects',
          id: 124
          title:'Project Title',
          titleURL: 'Project Title URL',
          logline: 'Project Logline',
          description: 'Project Description',
          creationDate: 1681808956,
          completionDate: 1684400956,
          walletAddress?: string | undefined
          metadata?: any | undefined
          impactTags?: string | undefined
          impact?: string | undefined
          submissions: Array<{ __typename?: 'Submissions'; id: any }>
          artifacts: Array<{
            __typename?: 'Artifacts'
            id: any
            name?: string | undefined
            description?: string | undefined
            artwork?: string | undefined
            video?: string | undefined
            edition?: string | undefined
            blockchainAddress?: string | undefined
            dateMinting?: any | undefined
            token?: string | undefined
            createdAt: any
            openEditionCopies_aggregate: {
              __typename?: 'OpenEditionCopies_aggregate'
              aggregate?: { __typename?: 'OpenEditionCopies_aggregate_fields'; count: number } | undefined
            }
          }>
          members: Array<{
            __typename?: 'ProjectMembers'
            id: any
            type: string
            user?:
              | {
                  __typename?: 'Users'
                  id: any
                  publicAddress?: string | undefined
                  firstName?: string | undefined
                  lastName?: string | undefined
                  profileImage?: string | undefined
                  createdAt: any
                  twitterHandle?: string | undefined
                  discordHandle?: string | undefined
                  artizenHandle?: string | undefined
                  hideFromLeaderboard?: boolean | undefined
                  website?: string | undefined
                  instagramHandle?: string | undefined
                  bannerImage?: string | undefined
                  bio?: string | undefined
                  externalLink?: string | undefined
                  claimed: boolean
                }
              | undefined
          }>
        }
      | undefined
    artifacts: Array<{
      __typename?: 'Artifacts'
      id: any
      name?: string | undefined
      description?: string | undefined
      artwork?: string | undefined
      video?: string | undefined
      edition?: string | undefined
      blockchainAddress?: string | undefined
      dateMinting?: any | undefined
      token?: string | undefined
      createdAt: any
      openEditionCopies_aggregate: {
        __typename?: 'OpenEditionCopies_aggregate'
        aggregate?: { __typename?: 'OpenEditionCopies_aggregate_fields'; count: number } | undefined
      }
    }>
  }>
}
}
const mockProject: IProjectFragment = {
  __typename: 'Projects',
  id: 124,
  title: 'My Project',
  titleURL: 'tiltleURL',
  logline: 'logline',
  description: 'description',
  creationDate: 1681798419,
  completionDate: 1684390419,
  walletAddress: '0xB2C5e3b1F2118AB5d8BA156Fc9D19Bc831C55A03',
  metadata: 'metadata.json',
  impactTags: 'impact tag',
  impact: 'impact',
  submissions: { __typename: 'Submissions', id: 124 },
  artifacts: {
    __typename: 'Artifacts',
    id: 124,
    name: 'Artifact name',
    description: 'Artifact description',
    artwork: 'artwork link',
    video: 'video link',
    edition: 'Open edition',
    blockchainAddress: 'eth mainnet?',
    dateMinting: 1681798999,
    token: 'token',
    createdAt: 1681798419,
    openEditionCopies_aggregate: {
      __typename: 'OpenEditionCopies_aggregate',
      aggregate: { __typename: 'OpenEditionCopies_aggregate_fields', count: 1 },
    },
  },
  members: {
    __typename: 'ProjectMembers',
    id: 124,
    type: 'type',
    user: {
      __typename: 'Users',
      id: 124,
      publicAddress: '0x',
      firstName: 'First Name',
      lastName: 'Last Name',
      profileImage: 'profileimg URL',
      createdAt: 1681798419,
      twitterHandle: '@twitterhandle',
      discordHandle: '@discordhandle',
      artizenHandle: '@artizenhandle',
      hideFromLeaderboard: false,
      website: 'website link',
      instagramHandle: '@IGhandle',
      bio: 'User bio',
      externalLink: 'External link',
      claimed: true,
    },
  },
}
export { mockSeason, mockProject }
