import { useLoggedInUser, initIntercom } from '@lib'
import LoginShelf from '../LoginShelf'
import AccountShelf from '../AccountShelf'

const SessionShelf = () => {
  initIntercom()
  const [loggedInUser] = useLoggedInUser()
  return !!loggedInUser ? <AccountShelf user={loggedInUser} /> : <LoginShelf />
}

export default SessionShelf
