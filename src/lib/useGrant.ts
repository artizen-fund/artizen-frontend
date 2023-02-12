import { useContext } from 'react'
import { ArtizenArtifactsAbi, GrantsAbi } from '@contracts'
import { BigNumber, ethers } from 'ethers'
import { useAccount, useContract, useSigner } from 'wagmi'
import { assert } from './assert'
import { IGrantsWithProjectFragment } from '@types'
import { UPDATE_GRANTS, UPDATE_ARTIFACTS, GET_USERS_AND_CURATORS } from '@gql'
import { useMutation, useLazyQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { ARTIZEN_TIMEZONE, LayoutContext } from '@lib'

export const useGrant = () => {
  const { toggleModal } = useContext(LayoutContext)
  const { isConnected, address } = useAccount()
  const { data: signer } = useSigner()
  const [updateGrant, { error: updatingGrantError }] = useMutation(UPDATE_GRANTS)
  const [updateArtifact, { error: updatingArtifactsError }] = useMutation(UPDATE_ARTIFACTS)
  const [getUser] = useLazyQuery(GET_USERS_AND_CURATORS)

  if (updatingGrantError) {
    throw new Error('Updating Grant Error, error= ', updatingGrantError)
  }

  if (updatingArtifactsError) {
    throw new Error('Updating Grant Error, error= ', updatingArtifactsError)
  }

  if (isConnected) {
    console.log('isConnected   ', isConnected)
  }

  const nftContractAddress = assert(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, 'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS')
  const grantContractAddress = assert(
    process.env.NEXT_PUBLIC_GRANTS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_GRANTS_CONTRACT_ADDRESS',
  )

  const nftContract = useContract({
    address: nftContractAddress,
    abi: ArtizenArtifactsAbi,
    signerOrProvider: signer,
  })

  const grantsContract = useContract({
    address: grantContractAddress,
    abi: GrantsAbi,
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

  const mintNFTs = async (grant: IGrantsWithProjectFragment) => {
    //map artifacts data

    if (!grant.submission) {
      throw new Error('Grant cannot be published because it is missing submission')
    }

    const { artifacts } = grant.submission
    const { project } = grant.submission
    const members = grant.submission?.project?.members
    const impactTags = grant.submission?.project?.impactTags?.split(',') || []

    const leadMemberTraitType = members?.map(({ user, type }) => {
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
      const latestTokenId: BigNumber = await nftContract?.getCurrentTokenId()
      // The minted Artifact order is:
      //     1. Creator
      //     2. Community
      //     3. Patron
      const artifactNumber = latestTokenId.add(index + 1) // can't + a BigNumber and a Number, so need to .add()...
      const artifactName = `Artifact #${artifactNumber}`
      const artifactDescription = `**${artifactName} minted by "${project.title}"**
*${artifact.edition} Edition 1/1*
      
**About**: ${project.logline}
      
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
            value: moment.tz(project.creationDate, ARTIZEN_TIMEZONE).unix(),
            display_type: 'date',
          },
          {
            trait_type: 'Project Completed',
            value: moment.tz(project.completionDate, ARTIZEN_TIMEZONE).unix(),
            display_type: 'date',
          },
          { trait_type: 'Limited Series', value: artifact.edition },
          { trait_type: 'Minted', value: `Season ${grant.season}` },
          { trait_type: 'Project', value: project.title },

          { trait_type: 'Lead Creator', value: leadMemberTraitType },
          ...impactTags.map(tag => {
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

      const ipfsUri = `ipfs://${metadata.IpfsHash}`
      console.log(`ipfsUri: ${ipfsUri}`)

      return ipfsUri
    })

    console.log('before first safe mint')

    const mintTransaction0 = await nftContract?.safeMint(address, metadataUris[0])
    await mintTransaction0.wait()

    console.log('before second safe mint')

    const mintTransaction1 = await nftContract?.safeMint(address, metadataUris[1])
    await mintTransaction1.wait()

    console.log('before third safe mint')

    const mintTransaction2 = await nftContract?.safeMint(address, metadataUris[2])
    await mintTransaction2.wait()

    console.log('after last safe mint')

    return Promise.all(metadataUris)
  }

  const publish = async (grant: IGrantsWithProjectFragment) => {
    // const grant = mockGrants[0]
    const metadataUris = await mintNFTs(grant)
    console.log(`metadataUris = ${metadataUris}`)

    if (!metadataUris) {
      throw new Error('Non metadataUris from NFTs publish')
    }

    const latestTokenId: BigNumber = await nftContract?.getCurrentTokenId()

    // Approve Grant contract to use the new NFT
    const approvalTransaction = await nftContract?.setApprovalForAll(grantContractAddress, true)
    await approvalTransaction.wait()

    console.log('grant.startTime   ', grant.startingDate)
    console.log('grant.closingDate   ', grant.closingDate)

    // OUR CONVENTION IS THAT grant.startingDate AND grant.closingDate ARE US PACIFIC TIME
    // strategy here is to construct the moment object with explicit US Pacific tz info
    const startTime = moment.tz(grant.startingDate, ARTIZEN_TIMEZONE).unix()
    const endTime = moment.tz(grant.closingDate, ARTIZEN_TIMEZONE).unix()

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
    const grantTransaction = await grantsContract?.createGrant(grantTuple)
    await grantTransaction.wait()

    console.log('Grant publish tx data      ', grantTransaction)

    const latestGrantCreateNumber = await grantsContract?.grantsCount()

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

    //updating NFTs
    const artifactsToUpdate = grant.submission?.artifacts.map(({ id }, index) => {
      const token = latestTokenId.sub(index).toString()
      console.log('index   ', index)
      console.log('latestTokenId.sub(index)   ', token)
      const data = {
        where: {
          id: {
            _eq: id,
          },
        },
        _set: {
          token,
        },
      }

      return data
    })

    console.log('artifactsToUpdate  ', artifactsToUpdate)

    await updateArtifact({
      variables: {
        updates: artifactsToUpdate,
      },
    })

    console.log('grant publised', updatingGrant)

    alert('Grant publish')
  }

  const sendRewards = async (grantId: number, winnerAddress: string) => {
    console.log('grantId   ', grantId)
    console.log('winnerAddress   ', winnerAddress)
    const grantTransaction = await grantsContract?.sendRewards(grantId, winnerAddress)
    await grantTransaction.wait()

    // get final grant data to update grant record in database
    const grantData = await grantsContract?.grants(grantId)

    console.log('grantData   ', grantData)

    const { data } = await getUser({
      variables: {
        where: {
          publicAddress: {
            _eq: grantData.topDonor.toLowerCase(),
          },
        },
      },
    })

    console.log('data getTopDonnorID ', data.Users[0].id)

    const updatingGrant = await updateGrant({
      variables: {
        _set: {
          status: 'rewarded',
          topDonorWinnerId: data.Users[0].id,
        },
        where: {
          blockchainId: {
            _eq: String(grantId),
          },
        },
      },
    })

    alert('Grant ended')
  }

  const donate = async (grantId: number, amount: string) => {
    console.log('getting transaction')
    const grantTransaction = await grantsContract?.donate(grantId, ethers.utils.parseEther(amount), {
      value: ethers.utils.parseEther(amount),
    })
    toggleModal?.('processTransaction')
    console.log('getting return transaction')
    const returnTx = await grantTransaction.wait()
    console.log('returning transaction')
    return returnTx
  }
  //sendRewards

  const cancelGrant = async (grantId: number) => {
    const grantTransaction = await grantsContract?.cancelGrant(grantId)
    await grantTransaction.wait()

    alert('Grant canceled')
  }

  return { publish, sendRewards, cancelGrant, donate }
}
