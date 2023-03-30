import { useDateHelpers, useSmartContracts, useFullSignOut } from '@lib'
import { IProjectFragment, ISeasonFragment } from '@types'
import { ethers } from 'ethers'
import {
  sendArtifactToIPFS,
  WALLET_ERROR_UNSUPPORTED_OPERATION,
  WALLET_ERROR_INSUFFICIENT_FUNDS,
  WALLET_ERROR_ACTION_REJECTED,
} from '@lib'

export const useSeasons = () => {
  const { seasonsContract } = useSmartContracts()
  const { getTimeUnix } = useDateHelpers()
  const { disconnectAndSignout } = useFullSignOut()

  const publishSeason = async (startTime: string, endTime: string) => {
    const startTimeUnix = getTimeUnix(startTime)
    const endTimeUnix = getTimeUnix(endTime)
    const tx = await seasonsContract?.createSeason(startTimeUnix, endTimeUnix)
    console.log('tx from create season', tx)
    return await tx.wait()
  }

  interface IMintOpenEditionsResponse {
    txHash?: string
    error?: string
  }

  const mintOpenEditions = async (
    tokenId: string,
    amount: number,
    unitPrice: number,
  ): Promise<IMintOpenEditionsResponse> => {
    console.log('mintOpenEditions call ')

    const finalAmount = unitPrice * amount

    console.log('unitPrice  ', finalAmount)
    console.log('amount divided ', amount / 100)

    try {
      const tx = await seasonsContract?.mintArtifact([tokenId], [amount], {
        value: ethers.utils.parseEther(finalAmount.toString()),
      })

      const mintOpenEditionsTx = await tx.wait()

      if (!mintOpenEditionsTx.transactionHash) {
        return {
          error: 'mintOpenEditionsTx failed',
        }
      }

      console.log('mintOpenEditionsTxfr', mintOpenEditionsTx)

      return {
        txHash: mintOpenEditionsTx.transactionHash,
      }
    } catch (e: any) {
      console.log('mintOpenEditions error ', e.code)

      //TODO: I am not sure if this will happen again but just in case
      if (e.code === WALLET_ERROR_UNSUPPORTED_OPERATION) {
        disconnectAndSignout()
      }

      const message = e.code === WALLET_ERROR_INSUFFICIENT_FUNDS ? 'Insufficient funds' : 'Unknown error'

      return {
        error: message,
      }
    }
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
