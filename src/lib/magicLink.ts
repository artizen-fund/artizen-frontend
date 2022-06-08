import { Magic } from 'magic-sdk'
import type { EthNetworkConfiguration } from '@magic-sdk/types'
import { OAuthExtension } from '@magic-ext/oauth'
import { assert } from '@lib'

// const customNodeOptions = {
//   rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
//   chainId: 80001,
// }

// Create client-side Magic instance
export const createMagic = (key: string, network: EthNetworkConfiguration) => {
  if (typeof window === 'undefined') return
  const NEXT_PUBLIC_ALCHEMY_API = assert(process.env.NEXT_PUBLIC_ALCHEMY_API, 'NEXT_PUBLIC_ALCHEMY_API')
  const customNodeOptions = {
    rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${NEXT_PUBLIC_ALCHEMY_API}`,
    chainId: 80001,
  }
  return new Magic(key, {
    network,
    extensions: [new OAuthExtension()],
  })
}

// IMPORTANT TODO: exporting this way creates a magic instance whether it's even being called or not!!
// export const magic = createMagic(NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, customNodeOptions)
