import { useCallback } from 'react'
import { useLoggedInUser, assert } from '@lib'
import { loadIntercom, trackEvent, shutdownIntercom } from 'next-intercom'

export const notifications = []

export const intercomEventEnum: { [key: string]: string } = {
  USER_LOGIN: 'user:login',
  DONATION_FIAT_START: 'donation:fiat:start',
  DONATION_FIAT_TOPUP: 'donation:fiat:pay:topup',
  DONATION_FIAT_CONFIRMED: 'donation:fiat:confirmed',
  DONATION_CRYTO_START: 'donation:crypto:start',
  DONATION_CRYTO_SWAP: 'donation:crypto:swap',
  DONATION_CRYTO_BRIDGE: 'donation:crypto:bridge',
  DONATION_CRYTO_CONFIRMED: 'donation:crypto:confirmed',
}

export const trackEventF = (type: string, target: object = {}) => {
  if (type !== intercomEventEnum[type]) {
    new Error('Unknown Event label')
  }
  trackEvent(type, target)
}

export function initIntercom() {
  const [loggedInUser, loading] = useLoggedInUser()

  const NEXT_PUBLIC_INTERCOM_APP_ID = assert(process.env.NEXT_PUBLIC_INTERCOM_APP_ID, 'NEXT_PUBLIC_INTERCOM_APP_ID')

  const startIntercom = useCallback(() => {
    loadIntercom({
      appId: NEXT_PUBLIC_INTERCOM_APP_ID,
      email: loggedInUser?.email, //default: ''
      name: loggedInUser && `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
      ssr: false, // default: false
      initWindow: true, // default: true
      delay: 0, // default: 0  - usefull for mobile devices to prevent blocking the main thread
    })
  }, [loggedInUser])

  if (!loading) {
    startIntercom()
  }

  return [loading] as const
}
