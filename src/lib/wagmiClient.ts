import { configureChains, chain, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { assert } from '@lib'

const getWagmiClient = () => {
  const alchemyApiKey = assert(process.env.NEXT_PUBLIC_ALCHEMY_API, 'NEXT_PUBLIC_ALCHEMY_API')
  const supportedChains = [chain.mainnet, chain.polygon, chain.ropsten, chain.goerli, chain.polygonMumbai]
  const { chains, provider, webSocketProvider } = configureChains(supportedChains, [
    alchemyProvider({ apiKey: alchemyApiKey }),
  ])

  const client = createClient({
    provider,
    webSocketProvider,
  })

  return client
}

export { getWagmiClient }
