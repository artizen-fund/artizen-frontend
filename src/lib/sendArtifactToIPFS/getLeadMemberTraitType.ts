import { IMemberFragment } from '@types'

export default (members: Array<IMemberFragment>) => {
  const lead = members.find(({ type }) => type === 'lead')
  if (!lead?.user) {
    throw new Error('Lead not found')
  }
  if (!lead.user.firstName || !lead.user.lastName) {
    throw new Error('Lead is missing required data')
  }
  return `${lead.user.firstName} ${lead.user.lastName}`
}
