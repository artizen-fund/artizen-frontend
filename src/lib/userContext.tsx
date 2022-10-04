import { createContext, useState } from 'react'
import { useReactiveVar, useQuery } from '@apollo/client'
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

  const { loading } = useQuery<IGetUserQuery>(GET_USER, {
    variables: { issuer: metadata?.issuer },
    onCompleted: async (data: { User: Array<Partial<IUser>> }) => {
      if (!data || data.User.length < 0) return
      const newlyLoggedUser = data.User[0] as IUser
      setLoggedInUser(newlyLoggedUser)
      setNeedsPostDonationData(
        !newlyLoggedUser.firstName ||
          !newlyLoggedUser.lastName ||
          !newlyLoggedUser.profileImage ||
          !newlyLoggedUser.artizenHandle,
      )
    },
  })

  return (
    <UserContext.Provider value={{ loading, loggedInUser, needsPostDonationData }}>{children}</UserContext.Provider>
  )
}
