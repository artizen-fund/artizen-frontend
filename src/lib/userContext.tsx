import { createContext, useEffect, useState } from 'react'
import { useReactiveVar, useLazyQuery } from '@apollo/client'
import { userMetadataVar, initIntercom } from '@lib'
import { GET_USER } from '@gql'
import { IUser, IGetUserQuery } from '@types'

interface IUserContext {
  loading?: boolean
  loggedInUser?: IUser
  needsPostDonationData: boolean
  setNeedsPostDonationData?: (b: boolean) => void
}

export const UserContext = createContext<IUserContext>({ needsPostDonationData: false, loading: true })

export const UserContextProvider = ({ children }: SimpleComponentProps) => {
  initIntercom()

  const metadata = useReactiveVar(userMetadataVar)
  const [loggedInUser, setLoggedInUser] = useState<IUser>()
  const [needsPostDonationData, setNeedsPostDonationData] = useState(false)

  const [fetchUser, { loading }] = useLazyQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
    onCompleted: async (user: { User: any[] }) => {
      if (!user || user.User.length < 0) return
      const newlyLoggedUser = user.User[0] as IUser
      setLoggedInUser(newlyLoggedUser)
      setNeedsPostDonationData(
        !newlyLoggedUser.firstName ||
          !newlyLoggedUser.lastName ||
          !newlyLoggedUser.profileImage ||
          !newlyLoggedUser.artizenHandle,
      )
    },
  })

  useEffect(() => {
    if (metadata?.issuer) {
      fetchUser()
    }
  }, [metadata?.issuer])

  return (
    <UserContext.Provider value={{ loggedInUser, loading, needsPostDonationData }}>{children}</UserContext.Provider>
  )
}
