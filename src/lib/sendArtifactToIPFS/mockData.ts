import { IArtifactFragment, IProjectFragment } from '@types'

const mockProject: IProjectFragment = {
  __typename: 'Projects',
  id: 'abc123',
  impact: 'test impact string',
  impactTags: `['tag1', 'tag2', 'tag3']`,
  titleURL: 'test-title-url',
  logline: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  creationDate: '2022-01-01 00:00:00',
  completionDate: '2022-01-02 00:00:00',
  submissions: [{ id: 'abc123', __typename: 'Submissions' }],
  walletAddress: '0x00000000000',
  title: 'Test Project',
  artifacts: [
    {
      __typename: 'Artifacts',
      id: 'id',
      name: 'name',
      description: 'description',
      artwork: 'artwork',
      video: 'video',
      edition: 'edition',
      blockchainAddress: 'blockchainAddress',
      dateMinting: 'dateMinting',
      token: 'token',
      createdAt: 'createdAt',
      openEditionCopies_aggregate: {
        aggregate: {
          count: 1,
        },
      },
    },
  ],
  members: [
    {
      __typename: 'ProjectMembers',
      id: 'abc234',
      type: 'lead',
      user: {
        __typename: 'Users',
        createdAt: '',
        id: 'abc345',
        firstName: 'Herp',
        lastName: 'Derp',
        artizenHandle: 'herpderp',
        twitterHandle: 'derpherp',
        website: 'https://derp.com',
        profileImage: undefined,
        publicAddress: 'null',
        claimed: false,
      },
    },
  ],
}

const mockArtifact: IArtifactFragment = {
  __typename: 'Artifacts',
  id: 'abc123',
  name: 'test artifact',
  description: 'Donec sed odio dui.',
  artwork: 'https://artizenartifacts.com/herpderp.jpg',
  video: undefined,
  edition: '1',
  blockchainAddress: '0x0000000000',
  dateMinting: '2022-01-01 00:00:00',
  token: '0x00000000',
  createdAt: '2022-01-01 00:00:00',
  openEditionCopies_aggregate: {
    aggregate: {
      count: 1,
    },
  },
}

const mockImageResponse = {
  IpfsHash: 'QmbwaRdfkS2V3ae2DvpUnCuLQw2pTUDLQiN4DrmomTXUzq',
  PinSize: 12113,
  Timestamp: '2023-02-06T23:47:56.336Z',
}

export { mockProject, mockArtifact, mockImageResponse }
