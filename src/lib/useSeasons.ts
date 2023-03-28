import { useDateHelpers, useSmartContracts } from '@lib'
import publishArtifact from './uploadArtifactDataToIPFS'

export const useSeasons = () => {
  const { seasonsContract } = useSmartContracts()
  const { getTimeUnix } = useDateHelpers()

  const publishSeason = async (startTime: string, endTime: string) => {
    const startTimeUnix = getTimeUnix(startTime)
    const endTimeUnix = getTimeUnix(endTime)
    const tx = await seasonsContract?.createSeason(startTimeUnix, endTimeUnix)

    console.log('tx from create season', tx)

    return await tx.wait()
  }

  const publishSubmission = async (seasonIndex: string, tokenURI: string, submissionOwnerWallet: string) => {
    const tx = await seasonsContract?.createSubmission(seasonIndex, tokenURI, submissionOwnerWallet)
    return await tx.wait()
  }

  return { publishSeason } as const
}
