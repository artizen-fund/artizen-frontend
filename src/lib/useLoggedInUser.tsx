import { useEffect, useState } from 'react'
import { useReactiveVar, useQuery, useApolloClient } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER, UPDATE_NEW_USER_PROFILE } from '@gql'
import { IUser, IGetUserQuery } from '@types'

// TODO: should this be a context instead of a custom hook?

export function useLoggedInUser() {
  const apolloClient = useApolloClient()
  const metadata = useReactiveVar(userMetadataVar)

  const { data, loading, error } = useQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
  })

  const [loggedInUser, setLoggedInUser] = useState<Partial<IUser>>()
  useEffect(() => setLoggedInUser(data?.User[0]), [data])

  const [newUserData, setNewUserData] = useState<NewUserData>()

  const saveNewUserData = async (user: Partial<IUser>, data: NewUserData) => {
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

  return { loggedInUser, loading, error, setNewUserData }
}
