import { usePrivy } from '@privy-io/react-auth'
import { deleteCookie } from 'cookies-next'
import { disconnect } from '@wagmi/core'

export const useFullSignOut = () => {
  const { logout } = usePrivy()

  const disconnectAndSignout = async () => {
    console.log('clicked on disconnectAndSignout')

    logout()

    deleteCookie('privy-token')
    deleteCookie('didToken')

    document.cookie.split(';').forEach(function (c) {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
    })

    localStorage.clear()

    await disconnect()

    window.location.reload()
  }

  return { disconnectAndSignout }
}
