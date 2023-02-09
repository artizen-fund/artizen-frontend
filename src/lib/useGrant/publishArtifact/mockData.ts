import { IArtifactFragment, IProjectFragment } from '@types'

const mockProject: IProjectFragment = {
  __typename: 'Projects',
  id: 'abc123',
  impact: 'test impact string',
  impactTags: `['tag1', 'tag2', 'tag3']`,
  logline: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  creationDate: '2022-01-01 00:00:00',
  completionDate: '2022-01-02 00:00:00',
  walletAddress: '0x00000000000',
  title: 'Test Project',
  members: [
    {
      __typename: 'ProjectMembers',
      id: 'abc234',
      type: 'lead',
      user: {
        __typename: 'Users',
        id: 'abc345',
        firstName: 'Herp',
        lastName: 'Derp',
        artizenHandle: 'herpderp',
        twitterHandle: 'derpherp',
        website: 'https://derp.com',
        profileImage: null,
        publicAddress: 'null',
      },
    },
  ],
}

const mockProjectNoTitle: IProjectFragment = {
  __typename: 'Projects',
  id: 'abc123',
  impact: 'test impact string',
  impactTags: `['tag1', 'tag2', 'tag3']`,
  logline: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  creationDate: '2022-01-01 00:00:00',
  completionDate: '2022-01-02 00:00:00',
  walletAddress: '0x00000000000',
  members: [
    {
      __typename: 'ProjectMembers',
      id: 'abc234',
      type: 'lead',
      user: {
        __typename: 'Users',
        id: 'abc345',
        firstName: 'Herp',
        lastName: 'Derp',
        artizenHandle: 'herpderp',
        twitterHandle: 'derpherp',
        website: 'https://derp.com',
        profileImage: null,
        publicAddress: 'null',
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
  video: null,
  edition: '1',
  blockchainAddress: '0x0000000000',
  dateMinting: '2022-01-01 00:00:00',
  token: '0x00000000',
  createdAt: '2022-01-01 00:00:00',
}
const mockArtifactNoEdition: IArtifactFragment = {
  __typename: 'Artifacts',
  id: 'abc123',
  name: 'test artifact',
  description: 'Donec sed odio dui.',
  artwork: 'https://artizenartifacts.com/herpderp.jpg',
  video: null,
  blockchainAddress: '0x0000000000',
  dateMinting: '2022-01-01 00:00:00',
  token: '0x00000000',
  createdAt: '2022-01-01 00:00:00',
}
const mockImageResponse = {
  IpfsHash: 'QmbwaRdfkS2V3ae2DvpUnCuLQw2pTUDLQiN4DrmomTXUzq',
  PinSize: 12113,
  Timestamp: '2023-02-06T23:47:56.336Z',
}

// TODO
const mockAnimationResponse = {
  IpfsHash: 'QmbwaRdfkS2V3ae2DvpUnCuLQw2pTUDLQiN4DrmomTXUzq',
}

// TODO
const mockMemberFragment = {
  lead: {
    user: [{ firstName: 'Zsofie', lastName: 'Tubel' }],
  },
}

const mockMemberFragmentMissingData = {
  lead: {
    user: [{ firstName: 'Zsofie' }],
  },
}

export {
  mockProject,
  mockArtifact,
  mockImageResponse,
  mockAnimationResponse,
  mockArtifactNoEdition,
  mockProjectNoTitle,
  mockMemberFragment,
  mockMemberFragmentMissingData,
}
