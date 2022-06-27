import { createContext, useContext, useState } from 'react'
import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import { SDKBase, InstanceWithExtensions } from '@magic-sdk/provider'
import { isServer, assert, assertInt, loginUser, fetchUser, logoutUser } from '@lib'

interface ISessionContext {
  magic?: InstanceWithExtensions<SDKBase, OAuthExtension[]>
  user?: ArtizenUser
  createSession: (email: string) => void
  checkSession: () => void
  endSession: () => void
}

const SessionContext = createContext<ISessionContext>({
  createSession: _ => undefined,
  checkSession: () => undefined,
  endSession: () => undefined,
})

export const SessionProvider = ({ children }: SimpleComponentProps) => {
  if (isServer()) return children

  const rpcUrl = assert(process.env.NEXT_PUBLIC_RPC_URL, 'NEXT_PUBLIC_RPC_URL')
  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
  const magicPublicKey = assert(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, 'NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY')

  const magic = new Magic(magicPublicKey, {
    network: { rpcUrl, chainId },
    extensions: [new OAuthExtension()],
  })

  const [user, setUser] = useState<ArtizenUser>()

  const createSession = async (email: string) => {
    const token = await magic.auth.loginWithMagicLink({ email, showUI: false })
    if (!token) throw 'error retrieving token'
    const loggedInUser = await loginUser(token)
    setUser(loggedInUser)
  }

  const checkSession = async () => {
    const userFromApi = await fetchUser()
    if (!!userFromApi.id) {
      setUser(userFromApi)
    }
  }

  const endSession = async () => {
    const loggedOut = await logoutUser()
    if (loggedOut) setUser(undefined)
  }

  return (
    <SessionContext.Provider value={{ magic, user, createSession, checkSession, endSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)
