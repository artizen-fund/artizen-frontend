import { IArtifactFragment, IProjectFragment, ISeasonFragment } from '@types'
import { BigNumber, ethers } from 'ethers'
import composeArtifactDescription from './composeArtifactDescription'
import composeMetadataObject from './composeMetadataObject'
import { sendDataToAPI } from './sendDataToIPFS'

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

const sendArtifactToIPFS = async (artifactNumber: number, season: ISeasonFragment, project: IProjectFragment) => {
  const artifactName = `Artifact #${artifactNumber}`
  const allProjectMembersString = project.members.map(({ user }) => `${user?.firstName} ${user?.lastName}`).join(', ')
  const artifactToUpload = project.artifacts[0]

  const artifactDescription = composeArtifactDescription(
    artifactName,
    project,
    artifactToUpload,
    allProjectMembersString,
  )

  const image = await sendDataToAPI(
    JSON.stringify({
      imagePath: artifactToUpload.artwork,
      name: `${artifactName}-image`,
    }),
  )

  const video = artifactToUpload.video
    ? await sendDataToAPI(
        JSON.stringify({
          imagePath: artifactToUpload.video,
          name: `${artifactName}-video`,
        }),
      )
    : undefined

  const metadataObject: MetadataObject = composeMetadataObject(
    artifactName,
    artifactDescription,
    artifactNumber,
    project,
    artifactToUpload,
    season.index,
    image,
    video,
  )

  const metadata = await sendDataToAPI(
    JSON.stringify({
      metadata: metadataObject,
      name: `${artifactName}-metadata`,
    }),
  )
  return `ipfs://${metadata.IpfsHash}`
}

export default sendArtifactToIPFS