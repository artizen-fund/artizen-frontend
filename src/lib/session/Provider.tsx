import { createContext, useReducer, ReactNode, useEffect, useState } from 'react'
import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import { assert, assertInt } from '@lib'
import { SessionState, initialState } from './state'
import { Dispatch } from './actions'
import { reducer } from './reducer'
import { dispatchMiddleware } from './dispatchMiddleware'

export const SessionContext = createContext<SessionState | undefined>(initialState)

export const SessionDispatchContext = createContext<Dispatch | undefined>(undefined)

interface ProviderProps {
  children: ReactNode
}

export const SessionProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [magic, setMagic] = useState<MagicLinkInstance>()

  useEffect(() => {
    const rpcUrl = assert(process.env.NEXT_PUBLIC_RPC_URL, 'NEXT_PUBLIC_RPC_URL')
    const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
    const magicPublicKey = assert(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, 'NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY')
    const newMagic = new Magic(magicPublicKey, {
      network: { rpcUrl, chainId },
      extensions: [new OAuthExtension()],
    })
    setMagic(newMagic)
  }, [])

  return (
    <SessionContext.Provider value={state}>
      <SessionDispatchContext.Provider value={dispatchMiddleware(dispatch, magic)}>
        {children}
      </SessionDispatchContext.Provider>
    </SessionContext.Provider>
  )
}
