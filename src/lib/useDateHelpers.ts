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

  const getDates = (startDate: string, endDate: string) => {
    return {
      now: dayjs().tz(ARTIZEN_TIMEZONE),
      start: dayjs(startDate),
      end: dayjs(endDate),
    }
  }

  const getSeasonStatus = (startDate: string, endDate: string) => {
    const { now, start, end } = getDates(startDate, endDate)

    if (now.isSameOrAfter(start) && now.isSameOrBefore(end)) {
      return 'active'
    } else if (now.isBefore(start)) {
      return 'upcoming'
    } else if (now.isAfter(end)) {
      return 'end'
    }
  }

  const isOpenForSubmissions = (startDate: string, endDate: string) => {
    const { now, start, end } = getDates(startDate, endDate)

    return (now.isSameOrAfter(start) && now.isSameOrBefore(end)) || now.isBefore(start)
  }

  const formatDate = (date: string) => {
    return dayjs(date).format('MMMM D, HH:mm')
  }

  return { formatDate, getSeasonStatus, isOpenForSubmissions }
}
