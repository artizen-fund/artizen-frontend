import { createContext, useContext } from 'react'
import { Magic, RPCError, RPCErrorCode } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import { isServer, assert, assertInt } from '@lib'
import { loginErrors } from '@copy/common'

interface IMagicContext {
  magic?: MagicInstance
  handleMagicError?: (err: RPCError) => string
}

const MagicContext = createContext<IMagicContext>({})

export const MagicProvider = ({ children }: SimpleComponentProps) => {
  if (isServer()) return children

  const rpcUrl = assert(process.env.NEXT_PUBLIC_POLYGON_RPC_URL, 'NEXT_PUBLIC_POLYGON_RPC_URL')
  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
  const magicPublicKey = assert(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, 'NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY')

  const magic = new Magic(magicPublicKey, {
    network: { rpcUrl, chainId },
    extensions: [new OAuthExtension()],
    // testMode: true,
  })

  const handleMagicError = (err: RPCError) => {
    switch (err.code) {
      case RPCErrorCode.InvalidParams:
      case RPCErrorCode.UpdateEmailFailed:
        return loginErrors.invalidEmail
      // note: ^ This is only error we have encountered thus far;
      //       the other messages are here just to cover our bases.
      case RPCErrorCode.MagicLinkExpired:
        return loginErrors.linkExpired
      case RPCErrorCode.UserAlreadyLoggedIn:
        return loginErrors.alreadyLoggedIn
      case RPCErrorCode.MagicLinkFailedVerification:
      case RPCErrorCode.MagicLinkRateLimited:
      case RPCErrorCode.MagicLinkInvalidRedirectURL:
      case RPCErrorCode.UserRequestEditEmail:
      case RPCErrorCode.ParseError:
      case RPCErrorCode.MethodNotFound:
      case RPCErrorCode.InvalidRequest:
      case RPCErrorCode.InternalError:
      default:
        return loginErrors.unknown
    }
  }

  return <MagicContext.Provider value={{ magic, handleMagicError }}>{children}</MagicContext.Provider>
}

export const useMagic = () => useContext(MagicContext)
