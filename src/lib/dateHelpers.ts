import { monthNames } from '@copy/common'

// we're storing some dates as yyyy-mm-dd, convert to pretty string
const dumbDateToString = (dumbDate: string) => {
  const realDate = new Date(dumbDate)
  const stringDate = `${monthNames[realDate.getMonth()]} ${realDate.getDate()}, ${realDate.getFullYear()}`
  return stringDate
}

const getDaysAgoFromDate = (start: number) => {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24
  const diffInTime = now.getTime() - start * 1000
  const diffInDays = Math.round(diffInTime / oneDay)
  return diffInDays
}

export { dumbDateToString, getDaysAgoFromDate }
