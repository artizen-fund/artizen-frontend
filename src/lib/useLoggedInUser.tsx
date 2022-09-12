import { useReactiveVar, useQuery } from '@apollo/client'
import { userMetadataVar } from '@lib'
import { GET_USER } from '@gql'
import { IGetUserQuery, IUser } from '@types'

export function useLoggedInUser() {
  // need to add loading because the loading value from useQuery is initial set to false

  // const [loggedInUser, setLoggedInUser] = useState<IUser>()
  const metadata = useReactiveVar(userMetadataVar)

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { issuer: metadata?.issuer },
  })

  const loggedInUser: IUser = data?.User[0] as IUser

  // NOTE: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/#custom-hooks
  return [loggedInUser, loading, error] as const
}
