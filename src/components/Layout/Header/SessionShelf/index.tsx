import { useContext } from 'react'
import { UserContext } from '@lib'
import LoginShelf from './LoginShelf'
import AccountShelf from '../AccountShelf'

interface ISessionShelf {
  hideShelf: () => void
}

const SessionShelf = ({ hideShelf }: ISessionShelf) => {
  const { loggedInUser } = useContext(UserContext)

  return !!loggedInUser ? <AccountShelf user={loggedInUser} {...{ hideShelf }} /> : <LoginShelf />
}

export default SessionShelf
