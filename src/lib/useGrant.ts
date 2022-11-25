import { ArtizenArtifactsAbi, GrantsAbi } from '@contracts'
import { useAccount, useContract, useSigner } from 'wagmi'
import { assert } from './assert'
import { mockGrants } from './mock-grants'

export const useGrant = () => {
  const { address, isConnected } = useAccount()
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

  const raflleContract = useContract({
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
        image: image.url,
        animation_url: video.url,
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

      return metadata.url
    })

    return metadataUris
  }

  const publish = async (grantId: string) => {
    const metadataUris = generateMetadata(grantId)

    console.log(metadataUris)
    // Mint a new NFT
    /*const mintTransaction = await nftContract.mint(address, 4, '0x', data.tokenURI)
    await mintTransaction.wait()

    const latestTokenId = await nftContract.tokenIds()

    // Approve Grant contract to use the new NFT
    const approvalTransaction = await nftContract.setApprovalForAll(grantContractAddress, true)
    await approvalTransaction.wait()

    const grant = {
      nftContract: nftContractAddress,
      nftOwner: address,
      grantID: 0,
      tokenID: latestTokenId,
      startTime: Math.round(new Date(data.startTime).getTime() / 1000), // must be timestamp in seconds
      endTime: Math.round(new Date(data.endTime).getTime() / 1000), // must be timestamp in seconds
      donationCount: 0,
      minimumDonationAmount: ethers.utils.parseUnits(data.mimDonationAmount.toString(), USDC_UNIT),
      topDonor: '0x0000000000000000000000000000000000000000',
      topDonatedAmount: BigNumber.from(0),
      tokenAllocation: ethers.utils.parseUnits(data.tokenAllocation.toString()),
      tokenBuffer: ethers.utils.parseUnits(data.tokenAllocation.toString()),
      cancelled: false,
      ended: false,
    }

    // Create a new Grant
    const grantTransaction = await raflleContract.createGrant(grant)
    await grantTransaction.wait()*/
  }

  return { publish }
}
