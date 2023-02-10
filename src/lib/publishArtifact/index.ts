import { IArtifactFragment, IProjectFragment } from '@types'
import { BigNumber, ethers } from 'ethers'
import composeArtifactDescription from './composeArtifactDescription'
import composeMetadataObject from './composeMetadataObject'
import { publishImageNFT, publishVideoNFT, publishNFTRequest } from './publishNFTRequest'

interface MetadataObject {
  name: string
  description: string
  image: string
  background_color: string
  external_url: string
  animation_url?: string
  attributes: Array<{
    trait_type: string
    value: string | number
    display_type?: string
  }>
}

export default async (
  nftContract: ethers.Contract,
  project: IProjectFragment,
  artifact: IArtifactFragment,
  season: number,
  index: number,
) => {
  const latestTokenId: BigNumber = await nftContract?.getCurrentTokenId()
  // The minted Artifact order is:
  //     1. Creator
  //     2. Community
  //     3. Patron
  const artifactNumber = latestTokenId.add(index + 1) // can't + a BigNumber and a Number, so need to .add()
  const artifactName = `Artifact #${artifactNumber}`
  const allProjectMembersString = project.members.map(({ user }) => `${user?.firstName} ${user?.lastName}`).join(', ')
  const artifactDescription = composeArtifactDescription(project, artifact, allProjectMembersString)

  const image = await publishImageNFT(artifact, artifactName)
  const animation = await publishVideoNFT(artifact, artifactName)

  const metadataObject: MetadataObject = composeMetadataObject(
    artifactName,
    artifactDescription,
    artifactNumber,
    project,
    artifact,
    season,
    image,
    animation,
  )

  const metadata = await publishNFTRequest(
    JSON.stringify({
      metadata: metadataObject,
      name: `${artifact.name}-metadata`,
      description: artifact.description,
    }),
  )
  return `ipfs://${metadata.IpfsHash}`
}
