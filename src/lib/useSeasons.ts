import { useDateHelpers, useSmartContracts } from '@lib'
import { IProjectFragment, ISeasonFragment } from '@types'
import { sendArtifactToIPFS } from '@lib'

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

  const publishSubmissions = async (season: ISeasonFragment, project: IProjectFragment) => {
    //get latest token id
    //getLatestTokenID
    const tx = await seasonsContract?.submissionCount()
    const submissionCount = await tx.toString()

    console.log('latestTokenIDR  ', submissionCount)

    const newSubmissionCount = parseInt(submissionCount) + 1

    //TODO: add ipfs hash to artifact record in Hasura

    const ipfsHash = await sendArtifactToIPFS(newSubmissionCount, season, project)

    console.log('ipfsHash  ', ipfsHash)

    //publish submuiission

    const publishSubmissionTX = await seasonsContract?.createSubmission(
      season.index,
      submissionCount,
      project.walletAddress,
    )

    const publishSubmissionTXReceipt = await publishSubmissionTX.wait()

    console.log('publishSubmissionTXReceipt  ', publishSubmissionTXReceipt)

    if (publishSubmissionTXReceipt.events[0].event === 'SubmissionCreated') {
      return {
        status: 'SubmissionCreated',
        artifactID: newSubmissionCount,
        artifactIDIpfsHash: ipfsHash,
      }
    }

    return null
  }

  return { publishSeason, publishSubmissions } as const
}
