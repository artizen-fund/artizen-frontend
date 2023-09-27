import {
  useDateHelpers,
  useContracts,
  useFullSignOut,
  useGnosis,
  sendArtifactToIPFS,
  WALLET_ERROR_UNSUPPORTED_OPERATION,
  WALLET_ERROR_INSUFFICIENT_FUNDS,
  WALLET_ERROR_UNPREDICTABLE_GAS_LIMIT,
} from '@lib'
import { UPDATE_SEASONS } from '@gql'

import { IProjectFragment, ISeasonFragment } from '@types'
import { BigNumber, ethers } from 'ethers'
import { useMutation } from '@apollo/client'

//TODO: Legacy component, left here for reference
export const useSeasons = () => {
  // const { writeAsync: publishSeasonAsync } = useContracts()
  const { getTimeUnix } = useDateHelpers()
  const { disconnectAndSignout } = useFullSignOut()
  // const { artizenPrizeAmountETH } = useGnosis()

  const [updateSeason] = useMutation(UPDATE_SEASONS, {
    onError: error => console.error('UPDATE_SEASONS error ', error),
  })

  // Publish season to smart contract,
  // this method is called from src/component/NewSeasonForm in the
  // SeasonForm component when the user clicks the publish button
  const publishSeason = async (startTime: string, endTime: string) => {
    // const startTimeUnix = getTimeUnix(startTime)
    // const endTimeUnix = getTimeUnix(endTime)
    // const tx = await seasonsContract?.createSeason(startTimeUnix, endTimeUnix)
    // console.log('tx from create season', tx)
    // return await tx.wait()
  }

  interface IMintOpenEditionsResponse {
    txHash?: string
    error?: string
  }

  // //Mints open editions when users click the button
  // //buy within project/slug
  // //Take into account that the project
  // //page shows the button to all the projects even if
  // //they have not  yet been published to the blockchain,
  // //and this method fails if the Artifact to buy open editions from has not tokenId
  const mintOpenEditions = async (tokenId: string, amount: number, unitPrice: number) => {
    console.log('mintOpenEditions call ')

    // const finalAmount = unitPrice * amount

    // try {
    //   const tx = await seasonsContract?.mintArtifact([tokenId], [amount], {
    //     value: ethers.utils.parseEther(finalAmount.toString()),
    //   })

    //   const mintOpenEditionsTx = await tx.wait()

    //   if (!mintOpenEditionsTx.transactionHash) {
    //     return {
    //       error: 'mintOpenEditionsTx failed',
    //     }
    //   }

    //   console.log('mintOpenEditionsTxfr', mintOpenEditionsTx)

    //   return {
    //     txHash: mintOpenEditionsTx.transactionHash,
    //   }
    // } catch (e: any) {
    //   console.log('mintOpenEditions error ', e.code)

    //   //TODO: I am not sure if this will happen again but just in case
    //   if (e.code === WALLET_ERROR_UNSUPPORTED_OPERATION) {
    //     disconnectAndSignout()
    //   }

    //   const message =
    //     (e.code === WALLET_ERROR_INSUFFICIENT_FUNDS && 'Insufficient funds') ||
    //     (e.code === WALLET_ERROR_UNPREDICTABLE_GAS_LIMIT && 'Insufficient funds') ||
    //     'Unknown error'

    //   return {
    //     error: message,
    //   }
    // }
  }

  // Publishes project submissions to smart contract.
  // When curators publish a submission from the project submission modal
  // within the admin projects.
  const publishSubmissions = async (season: ISeasonFragment, project: IProjectFragment) => {
    //get latest token id
    //getLatestTokenID
    // const tx = await seasonsContract?.submissionCount()
    // const submissionCount = await tx.toString()
    // console.log('latestTokenIDR  ', submissionCount)
    // const newSubmissionCount = parseInt(submissionCount) + 1
    // //TODO: add ipfs hash to artifact record in Hasura
    // const ipfsHash = await sendArtifactToIPFS(newSubmissionCount, season, project)
    // console.log('ipfsHash  ', ipfsHash)
    // const publishSubmissionTX = await seasonsContract?.createSubmission(season.index, ipfsHash, project.walletAddress)
    // const publishSubmissionTXReceipt = await publishSubmissionTX.wait()
    // console.log('publishSubmissionTXReceipt::::::  ', publishSubmissionTXReceipt)
    // if (publishSubmissionTXReceipt.events[0].event === 'SubmissionCreated') {
    //   return {
    //     artifactID: newSubmissionCount,
    //   }
    // }
    // return
  }

  const closeSeason = async (seasonIndex: number) => {
    // console.log('season ID', typeof seasonIndex, seasonIndex)
    // const tx = await seasonsContract?.closeSeason(seasonIndex)
    // console.log('tx from close season', tx)
    // const txResponse = await tx.wait()
    // const amountRaised = artizenPrizeAmountETH
    // console.log(`amountRaised = ${amountRaised}`)
    // const updateSeasonResult = await updateSeason({
    //   variables: {
    //     where: {
    //       index: { _eq: seasonIndex },
    //     },
    //     _set: {
    //       amountRaised,
    //       isClosed: true,
    //     },
    //   },
    //   onError: error => console.error('Error updating season', error),
    // })
    // return txResponse
  }

  return { publishSeason, publishSubmissions, mintOpenEditions, closeSeason } as const
}
