import { PinataPinResponse } from '@pinata/sdk'
import { IProjectFragment, ISubmissionFragment, ISeasonFragment, IArtifactFragment } from '@types'

const mockSeason: ISeasonFragment = {
  __typename: 'Seasons',
  id: 'abc123',
  startingDate: '',
  endingDate: '',
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
  members:{
    __typename: 'ProjectMembers'
    id: 124,
    type: "type",
    user: {
          __typename: 'Users',
          id: 124,
      publicAddress: 
            '0x',
          firstName: 'First Name',
          lastName:'Last Name',
          profileImage: 'profileimg URL',
          createdAt:1681798419,
          twitterHandle:'@twitterhandle',
          discordHandle: '@discordhandle',
          artizenHandle: '@artizenhandle',
          hideFromLeaderboard: false,
          website: 'website link',
          instagramHandle: '@IGhandle',
          bio: 'User bio',
          externalLink: 'External link',
          claimed: true
    
  }
}
export { mockSeason, mockProject }
