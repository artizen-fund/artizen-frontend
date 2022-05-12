import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, [])

  return <p>We will direct you to the next step</p>
}

export default Page
