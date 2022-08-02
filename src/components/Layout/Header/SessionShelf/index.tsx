import { useEffect } from 'react'
import { useLoggedInUser, initIntercom } from '@lib'
import LoginShelf from '../LoginShelf'
import AccountShelf from '../AccountShelf'

import { ShelfType } from '../'

interface ISessionShelf {
  setVisibleShelf: React.Dispatch<React.SetStateAction<ShelfType | undefined>>
}

const SessionShelf = ({ setVisibleShelf }: ISessionShelf) => {
  const [loggedInUser] = useLoggedInUser()
  initIntercom()

  useEffect(() => {
    setVisibleShelf('session')
    // Send token to server to validate
  }, [loggedInUser])

  return !!loggedInUser ? <AccountShelf user={loggedInUser} /> : <LoginShelf />
}

export default SessionShelf
