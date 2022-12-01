import { configureChains, chain, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { assert } from '@lib'

export const getWagmiChains = () => {
  const alchemyApiKey = assert(process.env.NEXT_PUBLIC_ALCHEMY_API, 'NEXT_PUBLIC_ALCHEMY_API')
  const supportedChains = [chain.mainnet, chain.goerli]
  const { chains, provider, webSocketProvider } = configureChains(supportedChains, [
    alchemyProvider({ apiKey: alchemyApiKey }),
  ])
  return { chains, provider, webSocketProvider }
}

export const getWagmiClient = () => {
  const { chains, provider, webSocketProvider } = getWagmiChains()
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  })
  return { client, chains }
}
