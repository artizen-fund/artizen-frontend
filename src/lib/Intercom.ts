import { useCallback, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { assert, loggedInUserVar } from '@lib'
import { loadIntercom, trackEvent, shutdownIntercom, updateIntercom } from 'next-intercom'

export const notifications = []

export enum intercomEventEnum {
  DONATION_START = 'donation:start',
  DONATION_FINISHED = 'donation:finished',
  DONATION_FAILED = 'donation:failed',
}

export const trackEventF = (type: intercomEventEnum, target: object = {}) => trackEvent(type, target)

export function initIntercom() {
  const loggedInUser = useReactiveVar(loggedInUserVar)

  const startIntercom = () => {
    const appId = assert(process.env.NEXT_PUBLIC_INTERCOM_APP_ID, 'NEXT_PUBLIC_INTERCOM_APP_ID')

    loadIntercom({
      appId,
      email: loggedInUser ? `${loggedInUser?.email}` : '',
      name: loggedInUser ? `${loggedInUser?.artizenHandle}` : '',
      ssr: false, // default: false
      initWindow: true, // default: true
      delay: 5, // default: 0  - useful for mobile devices to prevent blocking the main thread
    })
  }

  useEffect(() => {
    if (window.Intercom && !!loggedInUser && window.Intercom?.name !== loggedInUser?.artizenHandle) {
      updateIntercom('update', {
        email: loggedInUser?.email,
        name: loggedInUser?.artizenHandle,
      })
    }

    if (!window.Intercom && !loggedInUser) {
      startIntercom()
    }
  }, [loggedInUser])
}
