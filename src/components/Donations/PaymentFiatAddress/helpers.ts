import { nationCodes } from '@copy/common'
import supportedNations from './supportedNations'
import unsupportedUsStates from './unsupportedUsStates'

// note: returns true = DISABLED
const countryAndRegionIsSupported = (country?: string, state?: string): boolean => {
  if (!country) return true
  const foundNation = nationCodes.find(nation => nation.name === country)
  if (!foundNation) return true
  const supportedNation = supportedNations.includes(foundNation?.code)
  if (!supportedNation) return true
  if (foundNation.code !== 'US') {
    // supported nation, no state restrictions
    return false
  }
  if (!state) return true
  return unsupportedUsStates.includes(state)
}

export { countryAndRegionIsSupported }
