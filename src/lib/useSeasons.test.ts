import { useSeasons } from './useSeasons'
import { mockSeason, mockProject } from './mockData'

describe('publishSeason', () => {
  const { publishSeason } = useSeasons()
  it('publishes a season with correct details', () => {
    const result = publishSeason() // TODO how to pass in the arguments?
    expect(result.startingDate).toEqual(1681808956)
    expect(result.endingDate).toEqual(1684400956)
  })
})

describe('publishSubmissions', () => {
  it('publishes a submission with correct details', () => {
    //TODO
  })
})

describe('mintOpenEditions', () => {
  it('throws error if artifact has no tokenID', () => {
    publishSeason(1681808956, 1684400956)
    publishSubmissions(mockSeason, mockProject)
    const result = mintOpenEditions('', 1, 0.1)
    expect(result).toThrowError('mintOpenEditionsTx failed')
  })
  it('returns correct transaction hash', () => {
    const result = mintOpenEditions(124, 1, 0.1)
  })
})
