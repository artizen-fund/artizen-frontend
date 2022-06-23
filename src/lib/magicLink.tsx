import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import { SDKBase, InstanceWithExtensions } from '@magic-sdk/provider'
import { isServer, assert, assertInt } from '@lib'

interface IMagicLinkContext {
  magic?: InstanceWithExtensions<SDKBase, OAuthExtension[]>
  user?: ArtizenUser
  setUser: Dispatch<SetStateAction<ArtizenUser | undefined>>
}

const MagicLinkContext = createContext<IMagicLinkContext>({
  setUser: () => console.warn('warning: context has not been initialized'),
})

export const MagicLinkProvider = ({ children }: SimpleComponentProps) => {
  if (isServer()) return children

  const rpcUrl = assert(process.env.NEXT_PUBLIC_RPC_URL, 'NEXT_PUBLIC_RPC_URL')
  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
  const magicPublicKey = assert(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, 'NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY')

  const magic = new Magic(magicPublicKey, {
    network: { rpcUrl, chainId },
    extensions: [new OAuthExtension()],
  })

  const [user, setUser] = useState<ArtizenUser>()

  return <MagicLinkContext.Provider value={{ magic, user, setUser }}>{children}</MagicLinkContext.Provider>
}

export const useMagicLink = () => useContext(MagicLinkContext)
