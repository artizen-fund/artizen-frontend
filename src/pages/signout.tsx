import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'

const SignOut = () => {
  useEffect(() => {
    // const logoutAction = async () => {
    //   const response = await fetch('/api/logout', { method: 'POST' })
    //   // TODO: also log out Metamask
    //   if (response.status === 200) {
    //     window.location.assign(`${window.location.protocol}//${window.location.host}/`)
    //   }
    // }
    // logoutAction()

    signOut()
  }, [])

  return <div />
}

export default SignOut
