import React from 'react'
import { CourierProvider } from '@trycourier/react-provider'
import { useLoggedInUser } from './useLoggedInUser'

type INotification = {
  children: JSX.Element
}

export const Notification = ({ children }: INotification) => {
  const [loggedInUser] = useLoggedInUser()

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <CourierProvider userId={`${loggedInUser?.id}`} clientKey={process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY}>
      {children}
    </CourierProvider>
  )
}

export default Notification
