import React, { useEffect, createContext } from 'react'
import Script from 'next/script'
import { useLoggedInUser, assert } from '@lib'
import { loadIntercom, initIntercomWindow } from 'next-intercom'

export const notifications = []

export const IntercomEventEnum = {
  USER_LOGIN: 'user:login',
  DONATION_FIAT_START: 'donation:fiat:start',
  DONATION_FIAT_TOPUP: 'donation:fiat:pay:topup',
  DONATION_FIAT_CONFIRMED: 'donation:fiat:confirmed',
  DONATION_CRYTO_START: 'donation:crypto:start',
  DONATION_CRYTO_SWAP: 'donation:crypto:swap',
  DONATION_CRYTO_BRIDGE: 'donation:crypto:bridge',
  DONATION_CRYTO_CONFIRMED: 'donation:crypto:confirmed',
}

const useIntercom = () => {
  const [loggedInUser, loading] = useLoggedInUser()

  console.log('loading outside', loading)
  console.log('loggedInUser  outside ', loggedInUser)

  const NEXT_PUBLIC_INTERCOM_APP_ID = assert(process.env.NEXT_PUBLIC_INTERCOM_APP_ID, 'NEXT_PUBLIC_INTERCOM_APP_ID')

  if (!loading) {
    loadIntercom({
      appId: NEXT_PUBLIC_INTERCOM_APP_ID,
      email: loggedInUser?.email, //default: ''
      name: loggedInUser && `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      ssr: false, // default: false
      initWindow: true, // default: true
      delay: 0, // default: 0  - usefull for mobile devices to prevent blocking the main thread
    })
  }

  return [loading]
}

export default useIntercom
