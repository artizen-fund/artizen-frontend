import {
  useDateHelpers,
  useSmartContracts,
  useFullSignOut,
  useGnosis,
  sendArtifactToIPFS,
  WALLET_ERROR_UNSUPPORTED_OPERATION,
  WALLET_ERROR_INSUFFICIENT_FUNDS,
} from '@lib'
import { IProjectFragment, ISeasonFragment } from '@types'
import { ethers } from 'ethers'

export const useSeasons = () => {
  const { seasonsContract } = useSmartContracts()
  const { getTimeUnix } = useDateHelpers()
  const { disconnectAndSignout } = useFullSignOut()
  const { updateSafeBalance } = useGnosis()

  // Publish season to smart contract,
  // this method is called from src/component/NewSeasonForm in the
  // SeasonForm component when the user clicks the publish button
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

  //Mints open editions when users click the button
  //buy within project/slug
  //Take into account that the project
  //page shows the button to all the projects even if
  //they have not  yet been published to the blockchain,
  //and this method fails if the Artifact to buy open editions from has not tokenId
  const mintOpenEditions = async (
    tokenId: string,
    amount: number,
    unitPrice: number,
  ): Promise<IMintOpenEditionsResponse> => {
    console.log('mintOpenEditions call ')

    const finalAmount = unitPrice * amount

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

  // Publishes project submissions to smart contract.
  // When curators publish a submission from the project submission modal
  // within the admin projects.
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

    const publishSubmissionTX = await seasonsContract?.createSubmission(season.index, ipfsHash, project.walletAddress)

    const publishSubmissionTXReceipt = await publishSubmissionTX.wait()

    console.log('publishSubmissionTXReceipt::::::  ', publishSubmissionTXReceipt)

    if (publishSubmissionTXReceipt.events[0].event === 'SubmissionCreated') {
      return {
        artifactID: newSubmissionCount,
      }
    }

    return
  }

  return { publishSeason, publishSubmissions, mintOpenEditions } as const
}
