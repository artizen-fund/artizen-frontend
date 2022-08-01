import { useReactiveVar, useQuery, useState } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery, IUser } from '@types'

export const loggedInUser = () => {
  const metadata = useReactiveVar(userMetadataVar)
  const [user, setUser] = useState<IUser>(false)

  const { loading, error } = useQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
    onCompleted: data => {
      setUser(data.User[0])
    },
  })

  return [user, loading, error]
}
