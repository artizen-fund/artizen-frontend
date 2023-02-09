import { mockArtifact } from './mockData'
import { publishNFTRequest, publishImageNFT, publishVideoNFT } from './publishNFTRequest'

describe('publishNFTRequest', () => {
  it('fetches correct pinata response', () => {
    //TODO
  })
})

describe('publishImageNFT', () => {
  it('returns correct json response for image', () => {
    const result = publishImageNFT(mockArtifact, 'Artifact Name')
  })
})

describe('publishVideoNFT', () => {
  it('returns correct json response for video', () => {
    // TODO
  })
  it('returns undefinded if theres no video', () => {
    const result = publishImageNFT(mockArtifact, 'Artifact Name')
    expect(result).toEqual(undefined)
  })
})
