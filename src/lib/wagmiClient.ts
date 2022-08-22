import { configureChains, chain, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { assert } from '@lib'

export const getWagmiChains = () => {
  const alchemyApiKey = assert(process.env.NEXT_PUBLIC_ALCHEMY_API, 'NEXT_PUBLIC_ALCHEMY_API')
  const supportedChains = [chain.mainnet, chain.polygon, chain.ropsten, chain.goerli, chain.polygonMumbai]
  const { chains, provider, webSocketProvider } = configureChains(supportedChains, [
    alchemyProvider({ apiKey: alchemyApiKey }),
  ])
  return { chains, provider, webSocketProvider }
}

export const getWagmiClient = () => {
  const { provider, webSocketProvider } = getWagmiChains()
  const client = createClient({
    provider,
    webSocketProvider,
  })
  return client
}
