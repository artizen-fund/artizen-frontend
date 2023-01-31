import { useState } from 'react'
import { useDisconnect } from 'wagmi'
import { signOut } from 'next-auth/react'

export const useFullSignOut = () => {
  const { disconnect } = useDisconnect()

  const disconnectAndSignout = async () => {
    disconnect()
    await signOut()
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
    })
    localStorage.clear()
  }

  return { disconnectAndSignout }
}
