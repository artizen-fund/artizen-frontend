import { useEffect , useCallback } from 'react'
import { useAuth } from './AuthProvider'
import { useRouter } from 'next/router'
import Preloader from '../Temp/Preloader/Preloader'
import { isLoggedIn } from '../../lib/magic'


export interface AuthGuardProps {
  children: React.ReactNode
}


const AuthGuard = ({ children }: AuthGuardProps) => {
  // const { user, initializing, setRedirect } = useAuth()
  // const router = useRouter()

  // const checkLogin = useCallback(async () => {
  //   if (!initializing) {
  //     console.log('await isLoggedIn()  ', await isLoggedIn())
  //     //auth is initialized and there is no user
  //     if (!(await isLoggedIn())) {
  //       // remember the page that user tried to access
  //       setRedirect(router.route)
  //       const { query } = router
  //       router.push({ pathname: '/login', query })
  //     }
  //   }
  // }, [initializing, router, setRedirect])

  // useEffect(() => {
  //   checkLogin()
  // }, [checkLogin])

  /* show loading indicator while the auth provider is still initializing */
  // if (initializing) {
  //   return <Preloader />
  // }

  // // if auth initialized with a valid user show protected page
  // if (!initializing && user) {
  //   return <>{children}</>
  // }

  // /* otherwise don't return anything, will do a redirect from useEffect */
  // return null
}

export default AuthGuard
