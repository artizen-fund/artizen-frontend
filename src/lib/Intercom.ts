import { useCallback, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { assert, loggedInUserVar } from '@lib'
import { loadIntercom, trackEvent, shutdownIntercom } from 'next-intercom'

export const notifications = []

export enum intercomEventEnum {
  DONATION_START = 'donation:start',
  DONATION_FINISHED = 'donation:finished',
  DONATION_FAILED = 'donation:failed',
}

export const trackEventF = (type: intercomEventEnum, target: object = {}) => trackEvent(type, target)

export function initIntercom() {
  const loggedInUser = useReactiveVar(loggedInUserVar)

  const appId = assert(process.env.NEXT_PUBLIC_INTERCOM_APP_ID, 'NEXT_PUBLIC_INTERCOM_APP_ID')

  const startIntercom = useCallback(() => {
    loadIntercom({
      appId,
      email: loggedInUser?.email, // default: ''
      name: loggedInUser && `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
      ssr: false, // default: false
      initWindow: true, // default: true
      delay: 0, // default: 0  - useful for mobile devices to prevent blocking the main thread
    })
  }, [loggedInUser])

  useEffect(() => {
    if (!!loggedInUser) {
      startIntercom()
    } else {
      shutdownIntercom()
    }
  }, [loggedInUser])

  useEffect(() => {
    return () => shutdownIntercom()
  }, [])
}
