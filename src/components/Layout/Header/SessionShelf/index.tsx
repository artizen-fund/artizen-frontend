import { useState, useContext } from 'react'
import { UserContext } from '@lib'
import LoginShelf from './LoginShelf'
import SignupShelf from './SignupShelf'
import AccountShelf from '../AccountShelf'

interface ISessionShelf {
  hideShelf: () => void
}

const SessionShelf = ({ hideShelf }: ISessionShelf) => {
  const { loggedInUser } = useContext(UserContext)
  const [createMode, setCreateMode] = useState(true)

  return !!loggedInUser ? (
    <AccountShelf user={loggedInUser} {...{ hideShelf }} />
  ) : createMode ? (
    <SignupShelf {...{ setCreateMode }} />
  ) : (
    <LoginShelf {...{ setCreateMode }} />
  )
}

export default SessionShelf
