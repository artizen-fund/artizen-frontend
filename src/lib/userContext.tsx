import { createContext, useEffect, useState } from 'react'
import { useReactiveVar, useQuery, useApolloClient, ApolloError } from '@apollo/client'
import { userMetadataVar, initIntercom } from '@lib'
import { GET_USER, UPDATE_NEW_USER_PROFILE } from '@gql'
import { IUser, IGetUserQuery } from '@types'

interface IUserContext {
  loggedInUser?: IUser
  loading?: boolean
  error?: ApolloError
  setNewUserData?: (data: NewUserData) => void
}

export const UserContext = createContext<IUserContext>({})

export const UserContextProvider = ({ children }: SimpleComponentProps) => {
  initIntercom()

  const apolloClient = useApolloClient()
  const metadata = useReactiveVar(userMetadataVar)

  const { data, loading, error } = useQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
  })

  const [loggedInUser, setLoggedInUser] = useState<IUser>()
  useEffect(() => setLoggedInUser(data?.User[0] as IUser), [data])

  const [newUserData, setNewUserData] = useState<NewUserData>()

  const saveNewUserData = async (user: IUser, data: NewUserData) => {
    try {
      if (!user.id) {
        throw 'Data returned from Hasura does not include ID.'
      }
      await apolloClient.mutate({
        mutation: UPDATE_NEW_USER_PROFILE,
        variables: { id: user.id, ...data },
      })
      setNewUserData(undefined)
    } catch (error) {
      console.error('Error saving new user profile', error)
    }
  }

  useEffect(() => {
    if (!loggedInUser) return
    if (!!newUserData) {
      saveNewUserData(loggedInUser, newUserData)
    }
  }, [loggedInUser, newUserData])

  return (
    <UserContext.Provider value={{ loggedInUser, loading, error, setNewUserData }}>{children}</UserContext.Provider>
  )
}
