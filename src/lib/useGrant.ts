import { ArtizenArtifactsAbi, GrantsAbi } from '@contracts'
import { BigNumber, ethers } from 'ethers'
import { useAccount, useContract, useSigner } from 'wagmi'
import { assert } from './assert'
import { mockGrants } from './mock-grants'

export const useGrant = () => {
  const { address } = useAccount()
  const { data: signer } = useSigner()

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

  const generateMetadata = async (grantId: string) => {
    const grant = mockGrants[0]

    const metadataUris = grant.artifacts.map(async artifact => {
      const image = await publishNFTRequest(
        JSON.stringify({
          imagePath: artifact.imageUri,
          name: `${artifact.name}-image`,
          description: artifact.description,
        }),
      )

      const video = await publishNFTRequest(
        JSON.stringify({
          imagePath: artifact.videoUri,
          name: `${artifact.name}-video`,
          description: artifact.description,
        }),
      )

      const metadataObject = {
        name: grant.project.title,
        description: grant.project.description,
        background_color: '000000',
        image: `ipfs://${image.IpfsHash}`,
        animation_url: `ipfs://${video.IpfsHash}`,
        external_url: 'https://artizen.fund/artifacts',
        attributes: [
          {
            trait_type: 'Project Created',
            value: grant.project.creationDate,
            display_type: 'date',
          },
          {
            trait_type: 'Project Completed',
            value: grant.project.completionDate,
            display_type: 'date',
          },
          { trait_type: 'Limited Series', value: artifact.edition },
          { trait_type: 'Minted', value: grant.season },
          { trait_type: 'Project', value: grant.project.title },
          { trait_type: 'Lead Creator', value: `${grant.project.lead.firstName} ${grant.project.lead.lastName} ` },
          ...grant.project.tags.map(tag => {
            return { trait_type: 'Impact', value: tag }
          }),
        ],
      }

      const metadata = await publishNFTRequest(
        JSON.stringify({
          metadata: metadataObject,
          name: `${artifact.name}-metadata`,
          description: artifact.description,
        }),
      )
      return metadata
    })

    return Promise.all(metadataUris)
  }

  const publish = async (grantId: string) => {
    const grant = mockGrants[0]
    const metadataUris = await generateMetadata(grantId)

    // Mint a new NFTs
    for (let i = 0; i < metadataUris.length; i++) {
      const mintTransaction = await nftContract.safeMint(address, `ipfs://${metadataUris[i].IpfsHash}`)
      await mintTransaction.wait()
    }

    const latestTokenId: BigNumber = await nftContract.getCurrentTokenId()

    // Approve Grant contract to use the new NFT
    const approvalTransaction = await nftContract.setApprovalForAll(grantContractAddress, true)
    await approvalTransaction.wait()

    const grantTuple = {
      nftContract: nftContractAddress,
      nftOwner: address,
      grantsID: 0,
      tokenID1: latestTokenId.sub(3),
      tokenID2: latestTokenId.sub(2),
      tokenID3: latestTokenId.sub(1),
      startTime: grant.startTime, // must be timestamp in seconds
      endTime: (Number(grant.startTime) + 60 * 60 * 24).toString(), // must be timestamp in seconds
      minimumDonationAmount: ethers.utils.parseEther('0.008'),
      topDonor: '0x0000000000000000000000000000000000000000',
      topDonatedAmount: BigNumber.from(0),
      cancelled: false,
      ended: false,
    }

    // Create a new Grant
    const grantTransaction = await grantsContract.createGrant(grantTuple)
    await grantTransaction.wait()
  }

  return { publish }
}
