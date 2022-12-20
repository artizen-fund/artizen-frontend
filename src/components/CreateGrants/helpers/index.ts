import * as validateLib from 'wallet-address-validator'
import { ProjectMember, Artifacts } from '@forms/createGrants'

export const thereIsOneLead = (projectMembersR: Array<ProjectMember>) =>
  projectMembersR.filter(({ type, wallet }) => type === 'lead' && wallet !== undefined).length === 1

export const thereIsIncompleteInformationFilled = (projectMembersR: Array<ProjectMember>) =>
  projectMembersR.filter(
    ({ firstName, lastName, externalLink, email, wallet, type }) =>
      !firstName || !lastName || !externalLink || !email || !wallet || !type,
  ).length > 0

export const getUsersWalletIsNotCorrect = (projectMembersR: Array<ProjectMember>) =>
  projectMembersR
    .filter(({ wallet }) => !validateLib.validate(wallet, 'ETH'))
    .map(
      ({ firstName, lastName, wallet }) =>
        `${firstName} ${lastName} wallet is not a valid ETH wallet, wallet number: ${wallet}`,
    )

// TODO: This should be break down into smaller units
export const mapArtifactF = (artifactsData: Artifacts) => {
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
