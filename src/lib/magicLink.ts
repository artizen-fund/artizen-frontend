import { Magic } from 'magic-sdk'
import type { EthNetworkConfiguration } from '@magic-sdk/types'
import { OAuthExtension } from '@magic-ext/oauth'
import { assert } from '@lib'
import { assertInt } from './assert'
import { ethers } from 'ethers'

const NEXT_PUBLIC_RPC_URL = assert(process.env.NEXT_PUBLIC_RPC_URL, 'NEXT_PUBLIC_RPC_URL')
const NEXT_PUBLIC_CHAIN_ID = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
const NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY = assert(
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
  'NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY',
)

const customNodeOptions = {
  rpcUrl: NEXT_PUBLIC_RPC_URL,
  chainId: NEXT_PUBLIC_CHAIN_ID,
}

// Create client-side Magic instance
export const createMagic = (key: string, network: EthNetworkConfiguration) => {
  if (typeof window === 'undefined') return
  return new Magic(key, {
    network,
    extensions: [new OAuthExtension()],
  })
}

// IMPORTANT TODO: exporting this way creates a magic instance whether it's even being called or not!!
export const magic = createMagic(NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, customNodeOptions)

export const magicProvider = magic?.rpcProvider
// TODO: fix this Provider types mismatch
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const maticWeb3 = magicProvider ? new ethers.providers.Web3Provider(magicProvider) : undefined
