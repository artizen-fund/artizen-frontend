import { Magic } from 'magic-sdk'
import type { EthNetworkConfiguration } from '@magic-sdk/types'
import { OAuthExtension } from '@magic-ext/oauth'
import { assert, assertInt } from '@lib'
// import { ethers } from 'ethers'

// Create client-side Magic instance
export const createMagic = (key?: string, network?: EthNetworkConfiguration) => {
  if (typeof window === 'undefined') return

  const NEXT_PUBLIC_RPC_URL = assert(process.env.NEXT_PUBLIC_RPC_URL, 'NEXT_PUBLIC_RPC_URL')
  const NEXT_PUBLIC_CHAIN_ID = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
  const NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY = assert(
    process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
    'NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY',
  )

  return new Magic(key || NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
    network: network || {
      rpcUrl: NEXT_PUBLIC_RPC_URL,
      chainId: NEXT_PUBLIC_CHAIN_ID,
    },
    extensions: [new OAuthExtension()],
  })
}

// export const magicProvider = magic?.rpcProvider
// TODO: fix this Provider types mismatch
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// export const magicWeb3 = magicProvider ? new ethers.providers.Web3Provider(magicProvider) : undefined
