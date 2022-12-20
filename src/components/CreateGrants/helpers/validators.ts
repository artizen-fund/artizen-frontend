import * as validateLib from 'wallet-address-validator'
import { ProjectMember } from '@forms/createGrants'

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
