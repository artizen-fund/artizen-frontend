import composeMetadataObject from './composeMetadataObject'
import { mockProject, mockArtifact, mockImageResponse } from './mockData'
import { BigNumber } from 'ethers'

describe('composeMetadataObject', () => {
  it('composes a metadataObject based on a project and artifact', () => {
    const result = composeMetadataObject(
      'Test Artifact Name',
      'Test artifact description goes here',
      BigNumber.from('1'),
      mockProject,
      mockArtifact,
      1,
      mockImageResponse,
    )
    expect(result.name).toEqual('Test Artifact Name')
  })
})
