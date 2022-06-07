import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const SignOut = () => {
  const router = useRouter()
  useEffect(() => {
    const logoutAction = async () => {
      const response = await fetch('/api/logout', { method: 'POST' })
      if (response.status === 200) {
        router.push('/')
      }
    }
    logoutAction()
  }, [])

  return <div />
}

export default SignOut
