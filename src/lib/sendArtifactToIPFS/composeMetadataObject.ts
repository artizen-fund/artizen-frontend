import moment from 'moment-timezone'
import { IArtifactFragment, IProjectFragment } from '@types'
import { BigNumber } from 'ethers'
import { ARTIZEN_TIMEZONE } from '@lib'
import getLeadMemberTraitType from './getLeadMemberTraitType'
import { PinataPinResponse } from '@pinata/sdk'

export default (
  artifactName: string,
  artifactDescription: string,
  artifactNumber: number,
  project: IProjectFragment,
  artifact: IArtifactFragment,
  season: number,
  image: PinataPinResponse,
  video?: PinataPinResponse,
) => {
  if (!project.title) {
    throw new Error('Project is missing “title” property')
  }

  const impactTags = project.impactTags?.split(',') || []
  const leadMemberTraitType = getLeadMemberTraitType(project.members)

  return {
    name: artifactName,
    description: artifactDescription,
    image: `ipfs://${image.IpfsHash}`,
    animation_url: video ? `ipfs://${video.IpfsHash}` : undefined,
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
      // { trait_type: 'Limited Series', value: artifact.edition },
      { trait_type: 'Minted', value: `Season ${season}` },
      { trait_type: 'Project', value: project.title },
      { trait_type: 'Lead Creator', value: leadMemberTraitType },
      ...impactTags.map(tag => {
        return { trait_type: 'Impact', value: tag }
      }),
    ],
  }
}
