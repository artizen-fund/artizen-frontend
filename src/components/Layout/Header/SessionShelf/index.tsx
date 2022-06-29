import { useEffect } from 'react'
import { useSession } from '@lib'
import LoginShelf from '../LoginShelf'
import AccountShelf from '../AccountShelf'

const SessionShelf = () => {
  const { user, checkSession } = useSession()

  console.log('user  ', user)

  useEffect(() => {
    checkSession()
  }, [])

  return !!user ? <AccountShelf {...{ user }} /> : <LoginShelf />
}

export default SessionShelf
