import { useDateHelpers, useSmartContracts } from '@lib'

export const useSeasons = () => {
  const { seasonsContract } = useSmartContracts()
  const { getTimeUnix } = useDateHelpers()

  const publishSeason = async (startTime: string, endTime: string) => {
    const startTimeUnix = getTimeUnix(startTime)
    const endTimeUnix = getTimeUnix(endTime)
    const tx = await seasonsContract?.createSeason(startTimeUnix, endTimeUnix)
    return await tx.wait()

    console.log('tx from create season', tx)
  }

  return { publishSeason } as const
}
