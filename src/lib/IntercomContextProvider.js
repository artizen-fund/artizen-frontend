import React, { createContext } from 'react'

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

export const IntercomContent = createContext(null)

export const logIntercomEvent = (event, data) => {
  window.Intercom('trackEvent', event, data)
  // if (process.env.NEXT_PUBLIC_PROD) {
  //   window.Intercom('trackEvent', event, data)
  // } else {
  //   // eslint-disable-next-line no-console
  //   console.log('Intercom Event - non production')
  // }
}

const IntercomContextProvider = ({ children }) => {
  // useEffect(() => {
  //   //TODO: add process.env.NEXT_PUBLIC_PROD after texting
  //   // user && user.email &&
  //   if (!window.Intercom) {
  //     window.intercomSettings = {
  //       app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
  //     }

  //     if (user && user.email) {
  //       window.intercomSettings = {
  //         name: `${user.firstName} ${user.lastName}`,
  //         email: user.email,
  //         user_id: user.id,
  //       }
  //     }

  //     const w = window
  //     const ic = w.Intercom
  //     if (typeof ic === 'function') {
  //       ic('reattach_activator')
  //       ic('update', w.intercomSettings)
  //     } else {
  //       const d = document
  //       const i = () => {
  //         // eslint-disable-next-line
  //         i.c(arguments)
  //       }
  //       i.q = []
  //       i.c = (args) => {
  //         i.q.push(args)
  //       }
  //       w.Intercom = i
  //       const l = () => {
  //         const s = d.createElement('script')
  //         s.type = 'text/javascript'
  //         s.async = true
  //         s.src = 'https://widget.intercom.io/widget/pg8nvhfx'
  //         const x = d.getElementsByTagName('script')[0]
  //         x.parentNode.insertBefore(s, x)
  //       }
  //       if (w.attachEvent) {
  //         w.attachEvent('onload', l)
  //       } else {
  //         w.addEventListener('load', l, false)
  //       }
  //     }

  //     //   window.Intercom('update', { name: 'manilo', email: 'rubelux@gmail.com' })

  //     // eslint-disable-next-line no-console
  //     console.log('Intercom Set Up')
  //   }
  //   window.Intercom('hide')
  // }, [user])

  return <IntercomContent.Provider value={logIntercomEvent}>{children}</IntercomContent.Provider>
}

export default IntercomContextProvider
