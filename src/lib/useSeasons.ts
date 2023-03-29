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

  const mintOpenEditions = async (tokenId: string, amount: number) => {
    console.log('mintOpenEditions call ')
    const tx = await seasonsContract?.mintArtifact(0.02, [125], [2])

    console.log('tx from mintOpenEditions', tx)

    const mintOpenEditionsTx = await tx.wait()

    console.log('mintOpenEditionsTxfr', mintOpenEditionsTx)

    return mintOpenEditionsTx
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

    if (publishSubmissionTXReceipt.events[0].event === 'SubmissionCreated') {
      return {
        artifactID: newSubmissionCount,
      }
    }

    return
  }

  return { publishSeason, publishSubmissions, mintOpenEditions } as const
}
