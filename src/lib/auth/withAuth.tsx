import React from 'react'
import type { AppProps } from 'next/app'
import { assert } from '@lib'
import { AuthForm } from './AuthForm'

const withAuth = () => (PageComponent: NextJsInitializedPage) => {
  const WithAuth = (props: AppProps) => {
    // const { password } = JSON.parse(localStorage.getItem('ARTIZEN_DEV_PASSWORD') || '{}')
    // if (!password) {
    //   return <AuthForm />
    // }

    // const NEXT_PUBLIC_DEV_PASSWORD = assert(process.env.NEXT_PUBLIC_DEV_PASSWORD, 'NEXT_PUBLIC_DEV_PASSWORD')

    // console.log('NEXT_PUBLIC_DEV_PASSWORD  heyyeyeyeyey  ', NEXT_PUBLIC_DEV_PASSWORD)

    // if (password !== NEXT_PUBLIC_DEV_PASSWORD) {
    //   return <AuthForm />
    // }

    return <PageComponent {...props} />
  }
  return WithAuth
}

export default withAuth
