import { renderHook } from '@testing-library/react'
import { useSeasons } from './useSeasons'
import { mockSeason, mockProject } from './mockData'
import { MockConnector } from '@wagmi/core/connectors/mock'
import { mainnet } from '@wagmi/core/chains'
import { providers } from 'ethers'

describe('publishSeason', () => {
const connector = new MockConnector({
  options: {
    chainId: mainnet.id,
    signer: new providers.JsonRpcSigner(…),
  },
})
  it('publishes a season with correct details', () => {
    const { result } = renderHook(() => useSeasons())

    act(() => {
      result.current.publishSeason('19-04-2023 09:00', '19-05-2023 09:00')
    })

    expect(result.current.startingDate).toEqual(1681920000)
    expect(result.current.endingDate).toEqual(1684512000)
  })
})

describe('publishSubmissions', () => {
  it('publishes a submission with correct details', () => {
    const { result } = renderHook(() => useSeasons())

    act(() => {
      result.current.publishSubmissions(mockSeason, mockProject)
    })
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
