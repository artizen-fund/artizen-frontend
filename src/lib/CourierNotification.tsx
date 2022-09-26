import React, { useContext } from 'react'
import { CourierProvider } from '@trycourier/react-provider'
import { assert, UserContext } from '@lib'

export const CourierNotification = (props: any) => {
  const { loggedInUser } = useContext(UserContext)
  const COURIER_CLIENT_KEY = assert(process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY, 'NEXT_PUBLIC_COURIER_CLIENT_KEY')
  return <CourierProvider userId={`${loggedInUser?.id}`} clientKey={COURIER_CLIENT_KEY} {...props} />
}

export default CourierNotification
