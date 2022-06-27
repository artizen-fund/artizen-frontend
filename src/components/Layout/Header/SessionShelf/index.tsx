import { useSession } from '@lib'
import LoginShelf from '../LoginShelf'
import AccountShelf from '../AccountShelf'

const SessionShelf = () => {
  const { user } = useSession()

  return !!user ? <AccountShelf {...{ user }} /> : <LoginShelf />
}

export default SessionShelf
