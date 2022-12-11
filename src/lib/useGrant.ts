import { ArtizenArtifactsAbi, GrantsAbi } from '@contracts'
import { BigNumber, ethers } from 'ethers'
import { useAccount, useContract, useSigner } from 'wagmi'
import { assert } from './assert'
import { mockGrants } from './mock-grants'
import { IGrantsWithProjectAndDonationsFragment } from '@types'

export const useGrant = () => {
  const { address } = useAccount()
  const { data: signer, isError, isLoading } = useSigner()

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

  const generateMetadata = async (grantData: IGrantsWithProjectAndDonationsFragment) => {
    // const grant = mockGrants[0]
    console.log('grant.submission', grantData)
    //map artifacts data
    const grant = grantData

    if (!grant.submission) {
      throw new Error('Grant cannot be pubish because it is missing submission')
    }

    const { artifacts } = grant.submission
    const { project } = grant.submission

    if (!artifacts || !project) {
      return
    }

    //TODO: Artifacts need be an array
    // const artifacts = [
    //   {
    //     edition: 'Community',
    //     img: artifact.artworkCommunity,
    //     video: artifact.videoCommunity,
    //     name: artifact.name,
    //   },
    //   {
    //     edition: 'Creator',
    //     img: artifact.artworkCreator,
    //     video: artifact.videoCreator,
    //     name: artifact.name,
    //   },
    //   {
    //     edition: 'Patron',
    //     img: artifact.artworkPatron,
    //     video: artifact.videoPatron,
    //     name: artifact.name,
    //   },
    // ]

    // const metadataUris = artifacts.map(async artifact => {
    //   const metadataObject: Record<string, any> = {
    //     name: project?.title,
    //     description: project?.description,
    //     image: '',
    //     background_color: '000000',
    //     external_url: 'https://artizen.fund/artifacts',
    //     attributes: [
    //       {
    //         trait_type: 'Project Created',
    //         value: project.creationDate,
    //         display_type: 'date',
    //       },
    //       {
    //         trait_type: 'Project Completed',
    //         value: project.completionDate,
    //         display_type: 'date',
    //       },
    //       { trait_type: 'Limited Series', value: artifact.edition },
    //       { trait_type: 'Minted', value: grant.season },
    //       { trait_type: 'Project', value: project.title },
    //       //TODO: ADD memmber
    //       // { trait_type: 'Lead Creator', value: `${grant.project.lead.firstName} ${grant.project.lead.lastName} ` },
    //       // ...grant.project.tags.map(tag => {
    //       //   return { trait_type: 'Impact', value: tag }
    //       // }),
    //     ],
    //   }

    //   console.log('metadataObject    ', metadataObject)

    //   const image = await publishNFTRequest(
    //     JSON.stringify({
    //       imagePath: artifact.img,
    //       name: `${artifact.name}-image`,
    //       // description: artifact.description,
    //     }),
    //   )

    //   console.log('image publishNFTRequest ', image)

    //   metadataObject.image = `ipfs://${image.IpfsHash}`

    //   if (artifact.video) {
    //     console.log('it goes to video')
    //     const video = await publishNFTRequest(
    //       JSON.stringify({
    //         imagePath: artifact.video,
    //         name: `${artifact.name}-video`,
    //         // description: artifact.description,
    //       }),
    //     )

    //     metadataObject.animation_url = `ipfs://${video.IpfsHash}`
    //   }

    //   const metadata = await publishNFTRequest(
    //     JSON.stringify({
    //       metadata: metadataObject,
    //       name: `${artifact.name}-metadata`,
    //       //TODO: get the description
    //       description: 'artifact.description',
    //     }),
    //   )

    //   console.log('it print the metadata    ', metadata)
    //   return metadata
    // })

    // return Promise.all(metadataUris)
  }

  const publish = async (grantData: IGrantsWithProjectAndDonationsFragment) => {
    const grant = mockGrants[0]
    const metadataUris = await generateMetadata(grantData)

    console.log('metadataUris    ', metadataUris)

    // Mint a new NFTs
    // for (let i = 0; i < metadataUris.length; i++) {
    //   const mintTransaction = await nftContract.safeMint(address, `ipfs://${metadataUris[i].IpfsHash}`)
    //   await mintTransaction.wait()

    //   console.log('mintTransaction   ', mintTransaction)
    // }

    // const latestTokenId: BigNumber = await nftContract.getCurrentTokenId()

    // // Approve Grant contract to use the new NFT
    // const approvalTransaction = await nftContract.setApprovalForAll(grantContractAddress, true)
    // await approvalTransaction.wait()

    // const grantTuple = {
    //   nftContract: nftContractAddress,
    //   nftOwner: address,
    //   grantsID: 0,
    //   tokenID1: latestTokenId.sub(3),
    //   tokenID2: latestTokenId.sub(2),
    //   tokenID3: latestTokenId.sub(1),
    //   startTime: grant.startTime, // must be timestamp in seconds
    //   endTime: (Number(grant.startTime) + 60 * 60 * 24).toString(), // must be timestamp in seconds
    //   minimumDonationAmount: ethers.utils.parseEther('0.008'),
    //   topDonor: '0x0000000000000000000000000000000000000000',
    //   topDonatedAmount: BigNumber.from(0),
    //   cancelled: false,
    //   ended: false,
    // }

    // // Create a new Grant
    // const grantTransaction = await grantsContract.createGrant(grantTuple)
    // await grantTransaction.wait()

    // alert('Grant created')
  }

  const endGrant = async (grantId: number) => {
    const grantTransaction = await grantsContract.sendRewards(grantId)
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

  const cancelGrant = async (grantId: number) => {
    const grantTransaction = await grantsContract.cancelGrant(grantId)
    await grantTransaction.wait()

    alert('Grant canceled')
  }

  return { publish, endGrant, cancelGrant, donate }
}
