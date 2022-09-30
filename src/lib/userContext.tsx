import { createContext, useEffect, useState } from 'react'
import { useReactiveVar, useQuery, useApolloClient, ApolloError } from '@apollo/client'
import { userMetadataVar, initIntercom } from '@lib'
import { GET_USER } from '@gql'
import { IUser, IGetUserQuery } from '@types'

interface IUserContext {
  loggedInUser?: IUser
  loading?: boolean
  error?: ApolloError
  needsPostDonationData: boolean
  setNeedsPostDonationData?: (b: boolean) => void
}

export const UserContext = createContext<IUserContext>({ needsPostDonationData: false })

export const UserContextProvider = ({ children }: SimpleComponentProps) => {
  initIntercom()

  const metadata = useReactiveVar(userMetadataVar)

  const { data, loading, error } = useQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
  })

  const [loggedInUser, setLoggedInUser] = useState<IUser>()
  const [needsPostDonationData, setNeedsPostDonationData] = useState(false)
  useEffect(() => {
    if (!data || data.User.length < 0) return
    const newlyLoggedUser = data.User[0] as IUser
    setLoggedInUser(newlyLoggedUser)
    setNeedsPostDonationData(
      !newlyLoggedUser.firstName ||
        !newlyLoggedUser.lastName ||
        !newlyLoggedUser.profileImage ||
        !newlyLoggedUser.artizenHandle,
    )
  }, [data])

  return (
    <UserContext.Provider value={{ loggedInUser, loading, error, needsPostDonationData }}>
      {children}
    </UserContext.Provider>
  )
}
