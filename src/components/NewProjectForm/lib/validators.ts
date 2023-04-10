import * as validateLib from 'wallet-address-validator'
import { ProjectMember } from '@forms/createGrants'

export const thereIsOneLead = (projectMembers: Array<ProjectMember>) =>
  projectMembers.filter(({ type, wallet }) => type === 'lead' && wallet !== undefined).length === 1

export const thereIsIncompleteInformationFilled = (projectMembers: Array<ProjectMember>) =>
  projectMembers.filter(({ externalLink, email, wallet, type }) => !externalLink || !email || !wallet || !type).length >
  0

export const getUsersWalletIsNotCorrect = (projectMembersR: Array<ProjectMember>) =>
  projectMembersR
    .filter(({ wallet }) => !validateLib.validate(wallet, 'ETH'))
    .map(({ wallet }) => `wallet number '${wallet}' is not a valid ETH wallet`)

export const validateProjectMembers = (projectMembers: Array<ProjectMember>) => {
  /* "shouldn't this be in the additionalValidators of the form component?"
     Yes. However, the JSONforms array[] type is weird.
     At this time, we're not able to make a custom component with good messaging,
       so we're doing this alert() thing instead.
     TODO: address this someday.
  */

  if (!thereIsOneLead(projectMembers) || thereIsIncompleteInformationFilled(projectMembers)) {
    alert('You need to add all the project member data and at least one member with role lead and a blockchain wallet')
    return false
  }

  const usersWithIncorrectWallet = getUsersWalletIsNotCorrect(projectMembers)
  if (usersWithIncorrectWallet.length > 0) {
    alert(usersWithIncorrectWallet.join())
    return false
  }

  return true
}
