import { isProd } from './envHelpers'

export const getChainId = (method: string) => {
  // 1 - Ethereum - Ethereum mainnet
  // 137 - Matic -  Polygon mainnet
  // 5 - Goerli - Ethereum testnet
  // 80001 - Mumbai - Polygon testnet
  return isProd() ? (method === 'polygon' ? 137 : 1) : method === 'polygon' ? 80001 : 5
}
