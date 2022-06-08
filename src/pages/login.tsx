import React, { useContext, useState, useEffect } from 'react'
import Router from 'next/router'
import { useSession } from '@lib'

const Login = () => {
  const [disabled, setDisabled] = useState(false)
  const [email, setEmail] = useState('')
  const user = useSession()

  useEffect(() => {
    console.log('user  useEffect    ', user)
    user && user.email && Router.push('/verifyEmail')
  }, [user])

  const handleLoginWithEmail = async () => {
    try {
      {
        /*
      console.log('handleLoginWithEmail  ')
      // Disable login button to prevent multiple emails from being triggered
      setDisabled(true)

      console.log('email in here ', email)

      // Trigger Magic link to be sent to user
      const didToken = await magic?.auth.loginWithMagicLink({
        email,
        // Optional redirect back to your app after magic link is clicked
        redirectURI: new URL('/verified', window.location.origin).href,
      })

      console.log('didToken   ', didToken)

      // Validate didToken with server
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
      })

      res.status === 200 && Router.reload() 
      */
      }
    } catch (error) {
      setDisabled(false) // Re-enable login button - user may have requested to edit their email
      console.log('it goes here', error)
    }
  }

  return (
    <div>
      <input
        type="text"
        value={email}
        disabled={disabled}
        onChange={e => {
          setEmail(e.target.value)
        }}
        placeholder="email"
      />
      <hr />
      <button title="Login" onClick={handleLoginWithEmail}>
        login
      </button>
    </div>
  )
}

export default Login
