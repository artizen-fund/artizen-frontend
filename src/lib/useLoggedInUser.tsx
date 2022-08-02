import { useState } from 'react'
import { useReactiveVar, useQuery } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery, IUser } from '@types'

export function useLoggedInUser() {
  // need to add loading because the loading value from useQuery is initial set to false
  const [loading, setLoading] = useState<boolean>(true)
  const [loggedInUser, setLoggedInUser] = useState<IUser>()
  const metadata = useReactiveVar(userMetadataVar)

  useQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
    onCompleted: data => {
      setLoggedInUser(data.User[0] as IUser)
      setLoading(false)
    },
    onError: error => {
      console.error('updatePost resultado', error)
    },
  })
  // NOTE: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/#custom-hooks
  return [loggedInUser, loading] as const
}
