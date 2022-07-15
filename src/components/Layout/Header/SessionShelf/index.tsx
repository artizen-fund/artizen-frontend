import { useEffect, useState } from 'react'
import { useReactiveVar, useQuery } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery, IUser } from '@types'
import LoginShelf from '../LoginShelf'
import AccountShelf from '../AccountShelf'

const SessionShelf = () => {
  const metadata = useReactiveVar(userMetadataVar)
  const { data } = useQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
  })

  const [loggedInUser, setLoggedInUser] = useState<IUser>()
  useEffect(() => {
    if (data?.User && data.User.length > 0) {
      setLoggedInUser(data.User[0] as IUser)
    }
  }, [data])

  return !!metadata && !!loggedInUser ? <AccountShelf user={loggedInUser} /> : <LoginShelf />
}

export default SessionShelf
