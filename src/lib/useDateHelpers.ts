import { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { ARTIZEN_TIMEZONE } from './constants'

export const useDateHelpers = () => {
  dayjs.extend(utc)
  dayjs.extend(isBetween)
  dayjs.extend(timezone)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(isSameOrBefore)

  const getSeasonStatus = (startDate: string, endDate: string) => {
    const now = dayjs().tz(ARTIZEN_TIMEZONE)
    const start = dayjs(startDate)
    const end = dayjs(endDate)

    if (now.isSameOrAfter(start) && now.isSameOrBefore(end)) {
      return 'active'
    } else if (now.isBefore(start)) {
      return 'upcoming'
    } else if (now.isAfter(end)) {
      return 'ended'
    }
  }

  const formatDate = (date: string) => {
    return dayjs(date).format('MMMM D, HH:mm')
  }

  return { formatDate, getSeasonStatus }
}
