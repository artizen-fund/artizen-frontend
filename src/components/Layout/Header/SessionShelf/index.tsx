import { useQuery } from '@apollo/client'
import { USER_METADATA } from '@gql'
import LoginShelf from '../LoginShelf'
import AccountShelf from '../AccountShelf'

const SessionShelf = () => {
  return <LoginShelf />
  //  const { User } = useQuery(USER)
  //  return !!User ? <AccountShelf user={User} /> : <LoginShelf />
}

export default SessionShelf
