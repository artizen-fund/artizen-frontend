import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import { assert, assertInt } from '@lib'
import { Dispatch } from '../session/actions'

const loginUser = async (email: string, dispatch: Dispatch) => {
  const rpcUrl = assert(process.env.NEXT_PUBLIC_RPC_URL, 'NEXT_PUBLIC_RPC_URL')
  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
  const magicPublicKey = assert(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, 'NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY')

  const magic = new Magic(magicPublicKey, {
    network: { rpcUrl, chainId },
    extensions: [new OAuthExtension()],
  })

  const token = await magic.auth.loginWithMagicLink({ email, showUI: false })

  return await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async data => {
      const user = await data.json()
      if (!user.id) {
        throw new Error('error unwrapping JSON')
      }
      dispatch({ type: 'SET_USER', payload: { user } })
    })
    .catch(e => {
      throw new Error(e)
    })
}

export default loginUser
