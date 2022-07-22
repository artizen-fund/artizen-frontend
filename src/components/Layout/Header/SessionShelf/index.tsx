import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useApolloClient, useReactiveVar, useQuery } from '@apollo/client'
import { userMetadataVar, finishSocialLogin, useMagic } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery, IUser } from '@types'
import LoginShelf from '../LoginShelf'
import AccountShelf from '../AccountShelf'
import ProcessingSocialLoginShelf from '../ProcessingSocialLoginShelf'
import { ShelfType } from '../'

interface ISessionShelf {
  setVisibleShelf: React.Dispatch<React.SetStateAction<ShelfType | undefined>>
}

const SessionShelf = ({ setVisibleShelf }: ISessionShelf) => {
  const { query } = useRouter()
  const { magic } = useMagic()
  const apolloClient = useApolloClient()

  const metadata = useReactiveVar(userMetadataVar)
  const [loggedInUser, setLoggedInUser] = useState<IUser>()
  useQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
    onCompleted: data => setLoggedInUser(data.User[0] as IUser),
  })

  const [loadingSocialLogin, setLoadingSocialLogin] = useState<boolean>(false)
  useEffect(() => {
    if (!magic) throw 'Error: magic is not initialized.'
    if (!query.provider) return
    setLoadingSocialLogin(true)
    setVisibleShelf('session')
    // Send token to server to validate
    finishSocialLogin(apolloClient, magic)
  }, [query, magic])

  return !!metadata && !!loggedInUser ? (
    <AccountShelf user={loggedInUser} />
  ) : loadingSocialLogin ? (
    <ProcessingSocialLoginShelf />
  ) : (
    <LoginShelf />
  )
}

export default SessionShelf
