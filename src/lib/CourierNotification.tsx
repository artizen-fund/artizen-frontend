import React from 'react'
import { CourierProvider } from '@trycourier/react-provider'
import { useLoggedInUser } from './useLoggedInUser'
import { assert } from '@lib'

export const CourierNotification = (props: any) => {
  const [loggedInUser] = useLoggedInUser()
  const COURIER_CLIENT_KEY = assert(process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY, 'NEXT_PUBLIC_COURIER_CLIENT_KEY')
  return <CourierProvider userId={`${loggedInUser?.id}`} clientKey={COURIER_CLIENT_KEY} {...props} />
}

export default CourierNotification
