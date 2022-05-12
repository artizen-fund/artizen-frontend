import { Magic } from 'magic-sdk'
import type { EthNetworkConfiguration } from '@magic-sdk/types'
import { OAuthExtension } from '@magic-ext/oauth'
// import { isClient } from '@lib'

// const customNodeOptions = {
//   rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
//   chainId: 80001,
// }

const customNodeOptions = {
  rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API}`,
  chainId: 80001,
}

// Create client-side Magic instance
const createMagic = (key: string, network: EthNetworkConfiguration) => {
  if (typeof window === 'undefined') return
  return new Magic(key, {
    network,
    extensions: [new OAuthExtension()],
  })
}

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!, customNodeOptions)
