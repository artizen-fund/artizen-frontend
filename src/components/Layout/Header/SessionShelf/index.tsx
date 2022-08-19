import { useLoggedInUser, initIntercom } from '@lib'
import LoginShelf from '../LoginShelf'
import AccountShelf from '../AccountShelf'

interface ISessionShelf {
  hideShelf: () => void
}

const SessionShelf = ({ hideShelf }: ISessionShelf) => {
  initIntercom()
  const [loggedInUser] = useLoggedInUser()
  return !!loggedInUser ? <AccountShelf user={loggedInUser} {...{ hideShelf }} /> : <LoginShelf />
}

export default SessionShelf
