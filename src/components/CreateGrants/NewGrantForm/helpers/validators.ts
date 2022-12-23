import * as validateLib from 'wallet-address-validator'
import { ProjectMember } from '@forms/createGrants'

export const thereIsOneLead = (projectMembers: Array<ProjectMember>) =>
  projectMembers.filter(({ type, wallet }) => type === 'lead' && wallet !== undefined).length === 1

export const thereIsIncompleteInformationFilled = (projectMembers: Array<ProjectMember>) =>
  projectMembers.filter(
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

export const validateProjectMembers = (projectMembers: Array<ProjectMember>) => {
  if (!thereIsOneLead(projectMembers) || thereIsIncompleteInformationFilled(projectMembers)) {
    alert('You need to add all the project member data and at least one member with role lead and a blockchain wallet')
    return false
  }

  const usersWithIncorrectWallet = getUsersWalletIsNotCorrect(projectMembers)
  if (usersWithIncorrectWallet.length > 0) {
    alert(usersWithIncorrectWallet.join())
    return false
  }
}
