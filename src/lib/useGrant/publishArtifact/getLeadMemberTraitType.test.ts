import getLeadMemberTraitType from './getLeadMemberTraitType'
import { mockMemberFragment, mockMemberFragmentMissingData } from './mockData'

describe('getLeadMemberTraitType', () => {
  it('returns correct first name & last name for project lead', () => {
    const result = getLeadMemberTraitType(mockMemberFragment.lead.user)
    expect(result).toEqual('Zsofie Tubel')
  })

  it('throws error if user is not found', () => {
    //TODO
    const result = getLeadMemberTraitType(mockMemberFragment.lead.user)
  })
  it('throws error if users first or last name is missing', () => {
    const result = getLeadMemberTraitType(mockMemberFragmentMissingData.lead.user)
    expect(result).toThrowError('Lead is missing required data')
  })
})
