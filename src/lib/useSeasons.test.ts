import { renderHook, act } from '@testing-library/react'
import { useSeasons } from './useSeasons'
import { mockSeason, mockProject } from './mockData'
import { MockConnector } from '@wagmi/core/connectors/mock'
import { mainnet } from '@wagmi/core/chains'
import { providers } from 'ethers'

describe('publishSeason', () => {
  const connector = new MockConnector({
    options: { signer: getSigner() },
  })
  it('publishes a season with correct details', () => {
    const { result } = renderHook(() => useSeasons())

    act(() => {
      result.current.publishSeason('19-04-2023 09:00', '19-05-2023 09:00')
      connector.connect()
    })

    expect(result.current.publishSeason).toBe(/*transaction hash*/)
  })
})

describe('publishSubmissions', () => {
  it('publishes a submission with correct details', () => {
    const { result } = renderHook(() => useSeasons())

    act(() => {
      result.current.publishSeason('19-04-2023 09:00', '19-05-2023 09:00')
      result.current.publishSubmissions(mockSeason, mockProject)
    })
  })
})

describe('mintOpenEditions', () => {
  it('throws error if artifact has no tokenID', () => {
    const { result } = renderHook(() => useSeasons())

    act(() => {
      result.current.publishSeason('19-04-2023 09:00', '19-05-2023 09:00')
      result.current.publishSubmissions(mockSeason, mockProject)
      result.current.mintOpenEditions('', 1, 0.1)
    })

    expect(result).toThrowError('mintOpenEditionsTx failed')
  })
  it('returns correct transaction hash', () => {
    const { result } = renderHook(() => useSeasons())

    act(() => {
      result.current.publishSeason('19-04-2023 09:00', '19-05-2023 09:00')
      result.current.publishSubmissions(mockSeason, mockProject)
      result.current.mintOpenEditions('', 1, 0.1)
    })

    // TODO - how do I check the hash?
  })

  describe('closeSeason', () => {
    const { result } = renderHook(() => useSeasons())

    act(() => {
      result.current.publishSeason('19-04-2023 09:00', '19-05-2023 09:00')
      result.current.publishSubmissions(mockSeason, mockProject)
      result.current.mintOpenEditions('', 1, 0.1)

      result.current.closeSeason(1)
    })
  })
})
