import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { useMagic, useLoggedInUser } from '@lib'
import LoginShelf from '../LoginShelf'
import AccountShelf from '../AccountShelf'
import { useIntercom } from 'react-use-intercom'
import { ShelfType } from '../'

interface ISessionShelf {
  setVisibleShelf: React.Dispatch<React.SetStateAction<ShelfType | undefined>>
}

const SessionShelf = ({ setVisibleShelf }: ISessionShelf) => {
  // const { boot, update } = useIntercom()
  const [loggedInUser] = useLoggedInUser()

  useEffect(() => {
    setVisibleShelf('session')
    // Send token to server to validate

    if (loggedInUser) {
      // boot({
      //   name: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      //   email: loggedInUser.email,
      //   // userId: loggedInUser.id,
      // })
    }
  }, [loggedInUser])

  return !!loggedInUser ? <AccountShelf user={loggedInUser} /> : <LoginShelf />
}

export default SessionShelf
