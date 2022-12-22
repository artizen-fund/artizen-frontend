import React from 'react'
import { useSession } from 'next-auth/react'
import { CourierProvider } from '@trycourier/react-provider'
import { useQuery } from '@apollo/client'
import { assert } from '@lib'
import { IGetSelfQuery } from '@types'
import { GET_SELF } from '@gql'

export const CourierNotification = (props: any) => {
  const { data: session } = useSession()
  const { data: loggedInUser } = useQuery<IGetSelfQuery>(GET_SELF, {
    variables: {
      publicAddress: session?.user?.publicAddress.toLowerCase(),
    },
  })
  const COURIER_CLIENT_KEY = assert(process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY, 'NEXT_PUBLIC_COURIER_CLIENT_KEY')
  return <CourierProvider userId={`${loggedInUser?.Users[0].id}`} clientKey={COURIER_CLIENT_KEY} {...props} />
}

export default CourierNotification
