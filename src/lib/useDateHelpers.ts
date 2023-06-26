import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { ARTIZEN_TIMEZONE, HASURA_TIMEZONE_FORMAT } from './constants'

export const useDateHelpers = () => {
  dayjs.extend(utc)
  dayjs.extend(isBetween)
  dayjs.extend(timezone)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(isSameOrBefore)

  const SEASON_ACTIVE = 'active'
  const SEASON_UPCOMING = 'upcoming'
  const SEASON_ENDED = 'ended'

  const getNow = () => {
    return dayjs().tz(ARTIZEN_TIMEZONE)
  }

  const getNowWithFormat = (format?: string) => {
    return dayjs()
      .tz(ARTIZEN_TIMEZONE)
      .format(format || HASURA_TIMEZONE_FORMAT)
  }

  const getDates = (startDate: string, endDate: string) => {
    return {
      //TODO: There is a bug with comparations using dayjs with TZ.
      //The object from dayjs.TZ is not the same as the one created with the same date but without TZ
      //and compations methods like isSameOrAfter are not working
      now: dayjs(getNow().format(HASURA_TIMEZONE_FORMAT)),
      start: dayjs(startDate),
      end: dayjs(endDate),
    }
  }

  const getSeasonStatus = (startDate: string, endDate: string) => {
    const { now, start, end } = getDates(startDate, endDate)

    if (now.isSameOrAfter(start) && now.isSameOrBefore(end)) {
      return SEASON_ACTIVE
    } else if (now.isBefore(start)) {
      return SEASON_UPCOMING
    } else if (now.isAfter(end)) {
      return SEASON_ENDED
    }

    return 'unknown'
  }

  const isSeasonActive = (startDate: string, endDate: string) => {
    const seasonStatus = getSeasonStatus(startDate, endDate)

    return seasonStatus === SEASON_ACTIVE
  }

  const isSeasonEnded = (startDate: string, endDate: string) => {
    const seasonStatus = getSeasonStatus(startDate, endDate)

    return seasonStatus === SEASON_ENDED
  }

  const isOpenForSubmissions = (startDate: string, endDate: string) => {
    const seasonStatus = getSeasonStatus(startDate, endDate)

    return seasonStatus === SEASON_ACTIVE || seasonStatus === SEASON_UPCOMING || !isSeasonEnded(startDate, endDate)
  }

  const formatDate = (date: string) => {
    return dayjs(date).format('MMMM D, HH:mm')
  }

  const getTimeUnix = (date: string) => {
    return dayjs.tz(date, ARTIZEN_TIMEZONE).unix()
  }

  return {
    getNow,
    getNowWithFormat,
    formatDate,
    isSeasonActive,
    getSeasonStatus,
    isOpenForSubmissions,
    isSeasonEnded,
    getTimeUnix,
  }
}
