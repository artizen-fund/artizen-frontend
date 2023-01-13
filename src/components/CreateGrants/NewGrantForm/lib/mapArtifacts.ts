import { Artifacts } from '@forms/createGrants'

export type MappedArtifact = {
  edition: 'community' | 'patron' | 'creator'
  artwork?: string
  video?: string
}

export const mapArtifactF = (artifactsData: Artifacts): Array<MappedArtifact> => {
  // TODO: This should be break down into smaller units
  // The ordering is specified here
  // https://docs.google.com/document/d/1Jwsmc3WxCK_Z-uRCjLNhTp8EbJGSF0CT7MNDbg0jmQk/edit
  // Creator, Community, Patron
  return [
    {
      edition: 'creator',
      artwork: artifactsData.artworkCreator,
      video: artifactsData.videoCreator,
    },
    {
      edition: 'community',
      artwork: artifactsData.artworkCommunity,
      video: artifactsData.videoCommunity,
    },
    {
      edition: 'patron',
      artwork: artifactsData.artworkPatron,
      video: artifactsData.videoPatron,
    },
  ]
}
