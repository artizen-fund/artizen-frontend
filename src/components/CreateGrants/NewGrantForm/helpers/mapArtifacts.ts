import { Artifacts } from '@forms/createGrants'

export type MappedArtifact = {
  edition: 'community' | 'patron' | 'creator'
  artwork?: string
  video?: string
}

export const mapArtifactF = (artifactsData: Artifacts): Array<MappedArtifact> => {
  // TODO: This should be break down into smaller units
  return [
    {
      edition: 'community',
      artwork: artifactsData.artworkCommunity,
      video: artifactsData.videoCommunity,
    },
    {
      edition: 'patron',
      artwork: artifactsData.artworkPatron,
      video: artifactsData.videoCommunity,
    },
    {
      edition: 'creator',
      artwork: artifactsData.artworkCreator,
      video: artifactsData.videoCreator,
    },
  ]
}
