import getLeadMemberTraitType from './getLeadMemberTraitType'
import { mockMember, mockMemberMissingData } from './mockData'

describe('getLeadMemberTraitType', () => {
  it('returns correct first name & last name for project lead', () => {
    const result = getLeadMemberTraitType(mockMember.user)
    expect(result).toEqual('Zsofie Tubel')
  })

  it('throws error if user is not found', () => {
    //TODO
    const result = getLeadMemberTraitType(mockMember.user)
    expect(result).toThrowError('Lead not found')
  })
  it('throws error if users first or last name is missing', () => {
    const result = getLeadMemberTraitType(mockMemberMissingData.user)
    expect(result).toThrowError('Lead is missing required data')
  })
})
