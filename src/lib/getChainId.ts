import { isProd } from './envHelpers'

export const getChainId = (method: string) => {
  // 1 - Ethereum
  // 137 - Matic
  // 5 - Goerli
  // 80001 - Mumbai
  return isProd() ? (method === 'polygon' ? 137 : 1) : method === 'polygon' ? 80001 : 5
}
