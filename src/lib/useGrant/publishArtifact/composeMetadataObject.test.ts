import composeMetadataObject from './composeMetadataObject'
import {
  mockProject,
  mockArtifact,
  mockImageResponse,
  mockAnimationResponse,
  mockArtifactNoEdition,
  mockProjectNoTitle,
} from './mockData'
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
    expect(result.description).toEqual('Test artifact description goes here')
    expect(result.image).toEqual(`ipfs://${mockImageResponse.IpfsHash}`)
    expect(result.animation_url).toEqual(`ipfs://${mockAnimationResponse.IpfsHash}`)
    expect(result.background_color).toEqual('000000')
    expect(result.external_url).toEqual(`https://artizen.fund/projects/artifacts/artifact${BigNumber.from('1')}/`)
    //TODO expect(result.attributes).toContain('Project Created')
  })

  it('reverts if edition property is missing', () => {
    const result = composeMetadataObject(
      'Test Artifact Name',
      'Test artifact description goes here',
      BigNumber.from('1'),
      mockProject,
      mockArtifactNoEdition,
      1,
      mockImageResponse,
    )

    expect(result).toThrowError('Artifact is missing “edition” property')
  })
  it('reverts if project title is missing', () => {
    const result = composeMetadataObject(
      'Test Artifact Name',
      'Test artifact description goes here',
      BigNumber.from('1'),
      mockProjectNoTitle,
      mockArtifact,
      1,
      mockImageResponse,
    )

    expect(result).toThrowError('Project is missing “title” property')
  })
})
