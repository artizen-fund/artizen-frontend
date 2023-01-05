import { ArtizenArtifactsAbi, GrantsAbi } from '@contracts'
import { BigNumber, ethers } from 'ethers'
import { useAccount, useContract, useSigner } from 'wagmi'
import { assert } from './assert'
import { mockGrants } from './mock-grants'
import { IGrantsWithProjectFragment } from '@types'
import { UPDATE_GRANTS } from '@gql'
import { useMutation } from '@apollo/client'
import moment from 'moment-timezone'

export const useGrant = () => {
  const { address } = useAccount()
  const { data: signer, isError, isLoading } = useSigner()
  const [updateGrant] = useMutation(UPDATE_GRANTS)

  const nftContractAddress = assert(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, 'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS')
  const grantContractAddress = assert(
    process.env.NEXT_PUBLIC_GRANTS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_GRANTS_CONTRACT_ADDRESS',
  )

  const nftContract = useContract({
    addressOrName: nftContractAddress,
    contractInterface: ArtizenArtifactsAbi,
    signerOrProvider: signer,
  })

  const grantsContract = useContract({
    addressOrName: grantContractAddress,
    contractInterface: GrantsAbi,
    signerOrProvider: signer,
  })

  const publishNFTRequest = async (data: string) => {
    const response = await fetch('/api/publishNFT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })

    return response.json()
  }

  const minNFTs = async (grant: IGrantsWithProjectFragment) => {
    // const grant = mockGrants[0]
    console.log('grant.submission', grant)
    //map artifacts data

    if (!grant.submission) {
      throw new Error('Grant cannot be pubish because it is missing submission')
    }

    const { artifacts } = grant.submission
    const { project } = grant.submission
    const members = grant.submission?.project?.members
    const inpactTags = grant.submission?.project?.impactTags?.split(',') || []

    const leadMemberTraitType = project?.members.map(({ user, type }) => {
      console.log('user type, ', type === 'lead')
      console.log('user user, ', `${user?.firstName} ${user?.lastName}`)
      if (type === 'lead') {
        return `${user?.firstName} ${user?.lastName}`
      }
      return null
    })[0]

    console.log('leadMemberTraitType  ', leadMemberTraitType)

    const allProjectMembersString = project?.members
      .map(({ user, type }) => {
        console.log('user type, ', type)
        console.log('user user, ', `${user?.firstName} ${user?.lastName}`)
        return `${user?.firstName} ${user?.lastName}`
      })
      .join(', ')

    console.log('allProjectMembersString  ', allProjectMembersString)

    if (!artifacts || !project) {
      return
    }

    // NOTE: index must be aligned with the published NFTs on chain!
    const metadataUris = artifacts.map(async (artifact, index) => {
      // EK testing: it seems as though the Artifact number here should always the current token id + 1
      const latestTokenId: BigNumber = await nftContract.getCurrentTokenId()
      const artifactNumber = latestTokenId.add(1) // can't + a BigNumber and a Number, so need to .add()...
      const artifactName = `Artifact #${artifactNumber}`
      const artifactDescription = `**${artifactName} minted by "${project.title}"**
*${artifact.edition} Edition 1/1*
      
**About**: ${project.longline}
      
**Impact**: ${project.impact}
      
**Team**: ${allProjectMembersString}
      
This Artifact is in the [public domain](https://creativecommons.org/publicdomain/zero/1.0/).

**Supported by the [Artizen Fund](https://www.artizen.fund/) for human creativity**
`

      const metadataObject: Record<string, any> = {
        name: artifactName,
        description: artifactDescription,
        image: '',
        background_color: '000000',
        external_url: `https://artizen.fund/projects/artifacts/artifact${artifactNumber}/`,
        attributes: [
          {
            trait_type: 'Project Created',
            value: project.creationDate,
            display_type: 'date',
          },
          {
            trait_type: 'Project Completed',
            value: project.completionDate,
            display_type: 'date',
          },
          { trait_type: 'Limited Series', value: artifact.edition },
          { trait_type: 'Minted', value: `Season ${grant.season}` },
          { trait_type: 'Project', value: project.title },

          { trait_type: 'Lead Creator', value: leadMemberTraitType },
          ...inpactTags.map(tag => {
            return { trait_type: 'Impact', value: tag }
          }),
        ],
      }

      console.log('metadataObject    ', metadataObject)
      console.log('metadataObject json', JSON.stringify(metadataObject))

      const image = await publishNFTRequest(
        JSON.stringify({
          imagePath: artifact.artwork,
          name: `${artifactName}-image`,
          description: artifact.description,
        }),
      )

      metadataObject.image = `ipfs://${image.IpfsHash}`

      if (artifact.video) {
        console.log('it goes to video')
        const video = await publishNFTRequest(
          JSON.stringify({
            imagePath: artifact.video,
            name: `${artifactName}-video`,
            // description: artifact.description,
          }),
        )

        metadataObject.animation_url = `ipfs://${video.IpfsHash}`
      }

      const metadata = await publishNFTRequest(
        JSON.stringify({
          metadata: metadataObject,
          name: `${artifact.name}-metadata`,
          description: artifact.description,
        }),
      )

      const mintTransaction = await nftContract.safeMint(address, `ipfs://${metadata.IpfsHash}`)
      await mintTransaction.wait()

      return true
    })

    return Promise.all(metadataUris)
  }

  const publish = async (grant: IGrantsWithProjectFragment) => {
    // const grant = mockGrants[0]
    const metadataUris = await minNFTs(grant)

    console.log('IPFS metadataUris     ', metadataUris)

    if (!metadataUris) {
      throw new Error('Non metadataUris from NFTs publish')
    }

    const latestTokenId: BigNumber = await nftContract.getCurrentTokenId()

    // Approve Grant contract to use the new NFT
    const approvalTransaction = await nftContract.setApprovalForAll(grantContractAddress, true)
    await approvalTransaction.wait()

    console.log('grant.startTime   ', grant.startingDate)
    console.log('grant.closingDate   ', grant.closingDate)

    const startTime = moment(grant.startingDate).unix()
    const endTime = moment(grant.closingDate).unix()

    // const startingDate = Math.floor(Date.now() / 1000)
    // const endTime = (Number(startingDate) + 60 * 10).toString()

    console.log('grant starting time', startTime)
    console.log('grant  endTime', endTime)

    // COMPARE ABOVE WITH EXISTING COMMENT BELOW ON startTime
    const grantTuple = {
      nftContract: nftContractAddress,
      nftOwner: address,
      nftAuthor: grant.submission?.project?.walletAddress,
      grantsID: 0,
      tokenID1: latestTokenId,
      tokenID2: latestTokenId.sub(1),
      tokenID3: latestTokenId.sub(2),
      startTime, // must be timestamp in seconds
      endTime,
      minimumDonationAmount: ethers.utils.parseEther('0.008'),
      topDonor: '0x0000000000000000000000000000000000000000',
      topDonatedAmount: BigNumber.from(0),
    }

    console.log(grantTuple)

    //Create a new Grant
    const grantTransaction = await grantsContract.createGrant(grantTuple)
    await grantTransaction.wait()

    console.log('Grant publish tx data      ', grantTransaction)

    const latestGrantCreateNumber = await grantsContract.grantsCount()

    const blockchainId = latestGrantCreateNumber.toString()

    console.log('Grant published number    ', blockchainId)

    // update Grant blockchain and status

    const updatingGrant = await updateGrant({
      variables: {
        _set: {
          status: 'published',
          blockchainId,
        },
        where: {
          id: {
            _eq: grant.id,
          },
        },
      },
    })

    console.log('grant publised', updatingGrant)

    alert('Grant publish')
  }

  const endGrant = async (grantId: number, winnerAddress: string) => {
    console.log('grantId   ', grantId)
    console.log('winnerAddress   ', winnerAddress)
    const grantTransaction = await grantsContract.sendRewards(grantId, winnerAddress)
    await grantTransaction.wait()

    alert('Grant ended')
  }

  const donate = async (grantId: number, amount: string) => {
    let returnTx

    try {
      const grantTransaction = await grantsContract.donate(grantId, ethers.utils.parseEther(amount), {
        value: ethers.utils.parseEther(amount),
      })
      returnTx = await grantTransaction.wait()
    } catch (e: any) {
      if (e.code === 'INSUFFICIENT_FUNDS') {
        alert('Insufficient funds')
      }
    }

    return returnTx
  }
  //sendRewards

  const cancelGrant = async (grantId: number) => {
    const grantTransaction = await grantsContract.cancelGrant(grantId)
    await grantTransaction.wait()

    alert('Grant canceled')
  }

  return { publish, endGrant, cancelGrant, donate }
}
