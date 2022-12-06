import { createContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { initIntercom } from '@lib'
import { GET_USER } from '@gql'
import { IUsers, IGetUserQuery } from '@types'

interface IUserContext {
  loading?: boolean
  loggedInUser?: IUsers
  needsPostDonationData: boolean
  setNeedsPostDonationData?: (b: boolean) => void
}

export const UserContext = createContext<IUserContext>({ needsPostDonationData: false, loading: true })

export const UserContextProvider = ({ children }: SimpleComponentProps) => {
  initIntercom()

  const [loggedInUser, setLoggedInUser] = useState<IUsers>()
  const [needsPostDonationData, setNeedsPostDonationData] = useState(false)

  // TODO: revisit this for use of getLazyQuery
  // also, should we be using Apollo State or ReactiveVar instead of this context?
  // also these things…
  // const { data: session } = useSession()
  // const { isConnected } = useAccount()

  const { loading } = useQuery<IGetUserQuery>(GET_USER, {
    onCompleted: ({ Users }) => {
      if (Users.length === 0) {
        setLoggedInUser(undefined)
        setNeedsPostDonationData(false)
        return
      }

      const newlyLoggedUser = Users[0] as IUsers
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
