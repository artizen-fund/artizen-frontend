import { ARTIZEN_TIMEZONE, useSmartContracts } from '@lib'
import { BigNumber, ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { UPDATE_GRANTS, UPDATE_ARTIFACTS } from '@gql'
import { useMutation } from '@apollo/client'
import publishArtifact from '../publishArtifact'
import moment from 'moment-timezone'
import { IGrantFragment } from '@types'

export const usePublishGrant = () => {
  const { address } = useAccount()
  const { push } = useRouter()
  // const { nftContract, grantsContract, grantContractAddress, nftContractAddress } = useSmartContracts()
  // const [updateGrant, { error: updatingGrantError }] = useMutation(UPDATE_GRANTS)
  // const [updateArtifact, { error: updatingArtifactsError }] = useMutation(UPDATE_ARTIFACTS)

  // if (updatingGrantError) {
  //   throw new Error('Updating Grant Error, error= ', updatingGrantError)
  // }

  // if (updatingArtifactsError) {
  //   throw new Error('Updating Grant Error, error= ', updatingArtifactsError)
  // }

  // const mintNFTs = async (grant: IGrantFragment) => {
  //   // map artifacts data

  //   // Get mandatory data checks out of the way
  //   if (!nftContract) {
  //     throw new Error('NFT Contract is not yet initialized')
  //   }
  //   if (!grant.submission) {
  //     throw new Error('Grant cannot be published because it is missing a submission')
  //   }
  //   if (!grant.submission.project) {
  //     throw new Error('Grant cannot be published because the submission is missing a project')
  //   }
  //   if (!grant.submission.project.members) {
  //     throw new Error('Grant cannot be published because the project is missing members')
  //   }
  //   if (!grant.season) {
  //     throw new Error('Grant Season is missing')
  //   }

  //   const { project, artifacts } = grant.submission
  //   // NOTE: index must be aligned with the published NFTs on chain!
  //   const metadataUris = artifacts.map(
  //     async (artifact, index) => publishArtifact(nftContract, project, artifact, grant.season!, index),
  //     // note: I am not sure why this non-null assertions is necessary; the check/throw above should have cleared it. -EJ
  //   )

  //   const mintTransaction0 = await nftContract?.safeMint(address, metadataUris[0])
  //   await mintTransaction0.wait()

  //   const mintTransaction1 = await nftContract?.safeMint(address, metadataUris[1])
  //   await mintTransaction1.wait()

  //   const mintTransaction2 = await nftContract?.safeMint(address, metadataUris[2])
  //   await mintTransaction2.wait()

  //   return Promise.all(metadataUris)
  // }

  const publish = async (grant: IGrantFragment) => {
    // const grant = mockGrants[0]
    // const metadataUris = await mintNFTs(grant)
    // if (!metadataUris) {
    //   throw new Error('Non metadataUris from NFTs publish')
    // }

    // const latestTokenId: BigNumber = await nftContract?.getCurrentTokenId()

    // // Approve Grant contract to use the new NFT
    // const approvalTransaction = await nftContract?.setApprovalForAll(grantContractAddress, true)
    // await approvalTransaction.wait()

    // // OUR CONVENTION IS THAT grant.startingDate AND grant.closingDate ARE US PACIFIC TIME
    // // strategy here is to construct the moment object with explicit US Pacific tz info
    // const startTime = moment.tz(grant.startingDate, ARTIZEN_TIMEZONE).unix()
    // const endTime = moment.tz(grant.closingDate, ARTIZEN_TIMEZONE).unix()

    // // const startingDate = Math.floor(Date.now() / 1000)
    // // const endTime = (Number(startingDate) + 60 * 10).toString()

    // // COMPARE ABOVE WITH EXISTING COMMENT BELOW ON startTime
    // const grantTuple = {
    //   nftContract: nftContractAddress,
    //   nftOwner: address,
    //   nftAuthor: grant.submission?.project?.walletAddress,
    //   grantsID: 0,
    //   tokenID1: latestTokenId,
    //   tokenID2: latestTokenId.sub(1),
    //   tokenID3: latestTokenId.sub(2),
    //   startTime, // must be timestamp in seconds
    //   endTime,
    //   minimumDonationAmount: ethers.utils.parseEther('0.008'),
    //   topDonor: '0x0000000000000000000000000000000000000000',
    //   topDonatedAmount: BigNumber.from(0),
    // }

    // //Create a new Grant
    // const grantTransaction = await grantsContract?.createGrant(grantTuple)
    // await grantTransaction.wait()

    // const latestGrantCreateNumber = await grantsContract?.grantsCount()

    // const blockchainId = latestGrantCreateNumber.toString()

    // // update Grant blockchain and status

    // const updatingGrant = await updateGrant({
    //   variables: {
    //     _set: {
    //       status: 'published',
    //       blockchainId,
    //     },
    //     where: {
    //       id: {
    //         _eq: grant.id,
    //       },
    //     },
    //   },
    // })

    // //updating NFTs
    // const artifactsToUpdate = grant.submission?.artifacts.map(({ id }, index) => {
    //   const token = latestTokenId.sub(index).toString()
    //   const data = {
    //     where: {
    //       id: {
    //         _eq: id,
    //       },
    //     },
    //     _set: {
    //       token,
    //     },
    //   }

    //   return data
    // })

    // await updateArtifact({
    //   variables: {
    //     updates: artifactsToUpdate,
    //   },
    // })

    push(`/admin/grants/`)
  }

  return { publish }
}
