import { createContext, useContext, useState } from 'react'
import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import { isServer, assert, assertInt } from '@lib'

interface IMagicContext {
  magic?: any
}

const MagicContext = createContext<IMagicContext>({})

export const MagicProvider = ({ children }: SimpleComponentProps) => {
  if (isServer()) return children

  const rpcUrl = assert(process.env.NEXT_PUBLIC_RPC_URL, 'NEXT_PUBLIC_RPC_URL')
  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
  const magicPublicKey = assert(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, 'NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY')

  const magic = new Magic(magicPublicKey, {
    network: { rpcUrl, chainId },
    extensions: [new OAuthExtension()],
  })

  return <MagicContext.Provider value={{ magic }}>{children}</MagicContext.Provider>
}

export const useMagic = () => useContext(MagicContext)
