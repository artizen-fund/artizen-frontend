import { useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { assert } from '@lib'
import { IGetSelfQuery } from '@types'
import { GET_SELF } from '@gql'
import { loadIntercom, trackEvent, shutdownIntercom } from 'next-intercom'

export const notifications = []

export enum intercomEventEnum {
  USER_LOGIN = 'user:login',
  DONATION_FIAT_START = 'donation:fiat:start',
  DONATION_FIAT_TOPUP = 'donation:fiat:pay:topup',
  DONATION_FIAT_CONFIRMED = 'donation:fiat:confirmed',
  DONATION_CRYTO_START = 'donation:crypto:start',
  DONATION_CRYTO_SWAP = 'donation:crypto:swap',
  DONATION_CRYTO_BRIDGE = 'donation:crypto:bridge',
  DONATION_CRYTO_CONFIRMED = 'donation:crypto:confirmed',
}

export const trackEventF = (type: intercomEventEnum, target: object = {}) => trackEvent(type, target)

export function initIntercom() {
  const { data: session } = useSession()
  const { data: loggedInUser } = useQuery<IGetSelfQuery>(GET_SELF, {
    variables: {
      publicAddress: session?.user?.publicAddress.toLowerCase(),
    },
  })

  const appId = assert(process.env.NEXT_PUBLIC_INTERCOM_APP_ID, 'NEXT_PUBLIC_INTERCOM_APP_ID')

  const startIntercom = useCallback(() => {
    loadIntercom({
      appId,
      email: loggedInUser?.Users[0].email, // default: ''
      name: loggedInUser?.Users && `${loggedInUser?.Users[0].firstName} ${loggedInUser?.Users[0].lastName}`,
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
