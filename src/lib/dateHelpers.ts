import { monthNames } from '@copy/common'
import { IGrantsWithProjectFragment } from '@types'

// we're storing some dates as yyyy-mm-dd, convert to pretty string
export const formatStringDate = (dumbDate: string) => {
  const realDate = new Date(`${dumbDate}T00:00:00`)
  const stringDate = `${monthNames[realDate.getMonth()]} ${realDate.getDate()}, ${realDate.getFullYear()}`
  return stringDate
}

export const getDaysAgoFromDate = (start: number) => {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24
  const diffInTime = now.getTime() - start * 1000
  const diffInDays = Math.round(diffInTime / oneDay)
  return diffInDays
}

export const checkIsCurrentGrant = (grant: IGrantsWithProjectFragment) => {
  const now = new Date()
  const grantStarts = new Date(grant.startingDate)
  const grantEnds = new Date(grant.closingDate)
  return grantStarts <= now && grantEnds > now
}
