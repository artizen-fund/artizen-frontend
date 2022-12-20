import { monthNames } from '@copy/common'
import { IGrantsWithProjectFragment } from '@types'

// we're storing some dates as yyyy-mm-dd, convert to pretty string
export const formatStringDate = (dumbDate: string) => {
  const realDate = new Date(`${dumbDate}T00:00:00`)
  const stringDate = `${monthNames[realDate.getMonth()]} ${realDate.getDate()}, ${realDate.getFullYear()}`
  return stringDate
}

export const formatDate = (date: Date) => {
  const realDate = new Date(date)
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

const GMT_OFFSET = `0800`

export const checkIsCurrentGrant = (grant?: IGrantsWithProjectFragment) => {
  if (!grant) return false
  const now = new Date()
  const grantStarts = new Date(`${grant.startingDate}-${GMT_OFFSET}`)
  const grantEnds = new Date(`${grant.closingDate}-${GMT_OFFSET}`)
  return grantStarts <= now && grantEnds > now
}
