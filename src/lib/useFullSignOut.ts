import { usePrivy } from '@privy-io/react-auth'

export const useFullSignOut = () => {
  const { logout } = usePrivy()

  const disconnectAndSignout = async () => {
    console.log('clicked on disconnectAndSignout')

    logout()

    document.cookie.split(';').forEach(function (c) {
      // document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
      const cookie = c
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    })
    localStorage.clear()

    window.location.reload()
  }

  return { disconnectAndSignout }
}
