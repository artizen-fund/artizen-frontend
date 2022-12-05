import { useReactiveVar } from '@apollo/client'
import { loggedInUserVar } from '@lib'
import LoginShelf from './LoginShelf'
import AccountShelf from '../AccountShelf'

interface ISessionShelf {
  hideShelf: () => void
}

const SessionShelf = ({ hideShelf }: ISessionShelf) => {
  const loggedInUser = useReactiveVar(loggedInUserVar)

  return !!loggedInUser ? <AccountShelf user={loggedInUser} {...{ hideShelf }} /> : <LoginShelf />
}

export default SessionShelf
