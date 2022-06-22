import React, { useEffect, useState } from 'react'
import { isLoggedIn as isLoggedInCheck } from '../../lib/magic'

const redirectKey = 'sign_in_redirect'

export const AuthContext = React.createContext(undefined)

AuthContext.displayName = 'AuthContext'

function setRedirect(redirect) {
  window.sessionStorage.setItem(redirectKey, redirect)
}

function getRedirect() {
  return window.sessionStorage.getItem(redirectKey)
}

function clearRedirect() {
  return window.sessionStorage.removeItem(redirectKey)
}
export function useAuth() {
  const auth = React.useContext(AuthContext)

  if (!auth) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return auth
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState('loading')
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [refreshLogin, setRefreshLogin] = useState(true)
  // eslint-disable-next-line
  const [error, setError] = useState(null)

  useEffect(() => {
    const currentUserLabel = 'currentUser'
    const userInSession =
      window && window.sessionStorage.getItem(currentUserLabel)

    const userData = JSON.parse(userInSession)

    console.log('userInSession', JSON.parse(userInSession))

    const waitForUserData = async () => {
      const isLoggedInCheckR = await isLoggedInCheck()
      console.log('isLoggedInCheckR    ', isLoggedInCheckR)

      if (userData?.issuer) {
        setUser(userData)
        return
      }

      const res = await fetch('/api/user', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { errors, data } = await res.json()

      console.log('data queryHasura in here ', data)

      if (errors === 'no_cookie') {
        setRefreshLogin(true)
        return
      }

      window.sessionStorage.setItem(currentUserLabel, JSON.stringify(data))
      setUser(data)

      setInitializing(false)

      // fetch('/api/user')
      //   .then((res) => res.json())
      //   .then(async (data) => {
      //     if (data.id) {
      //       console.log('User  ', data)
      //       setUser(data)
      //     } else {
      //       setUser(null)
      //       setError(new Error('Empty user'))
      //     }

      //   })
      //   .catch((err) => {
      //     setUser(null)
      //     setError(err)
      //   })
    }

    if (userData?.issuer) {
      setUser(userData)
      return
    } else {
      waitForUserData().catch(console.error)
    }
  }, [])

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fetch('/api/user')
  //       .then((res) => res.json())
  //       .then(async (data) => {
  //         if (data.id) {
  //           console.log('User  ', data)
  //           setUser(data)
  //         } else {
  //           setUser(null)
  //           setError(new Error('Empty user'))
  //         }
  //         setInitializing(false)
  //       })
  //       .catch((err) => {
  //         setUser(null)
  //         setError(err)
  //       })
  //   }
  // }, [isLoggedIn])

  const value = {
    user,
    error,
    initializing,
    refreshLogin,
    setRedirect,
    getRedirect,
    clearRedirect,
    setIsLoggedIn,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
