import React from 'react'
import { assert } from '@lib'
import { AuthForm } from './'

const withAuth = () => PageComponent => {
  const WithAuth = props => {
    const storedPasswordBundle = localStorage.getItem('ARTIZEN_DEV_PASSWORD')
    if (!storedPasswordBundle) {
      return <AuthForm />
    }

    const { password } = JSON.parse(storedPasswordBundle)
    const NEXT_PUBLIC_DEV_PASSWORD = assert(process.env.NEXT_PUBLIC_DEV_PASSWORD, 'NEXT_PUBLIC_DEV_PASSWORD')

    if (password !== NEXT_PUBLIC_DEV_PASSWORD) {
      return <AuthForm />
    }

    return <PageComponent {...props} />
  }
  return WithAuth
}

export default withAuth
