import { configureChains, chain, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { assert } from '@lib'
import { ethers } from 'ethers'

export const getWagmiChains = () => {
  const alchemyApiKey = assert(process.env.NEXT_PUBLIC_ALCHEMY_API, 'NEXT_PUBLIC_ALCHEMY_API')
  const supportedChains = [chain.mainnet, chain.goerli]
  const { chains, provider, webSocketProvider } = configureChains(supportedChains, [
    alchemyProvider({ apiKey: alchemyApiKey }),
  ])
  return { chains, provider, webSocketProvider }
}

export const getWagmiClient = () => {
  const ethProvider = new ethers.providers.JsonRpcProvider(
    'http://127.0.0.1:8545/',
    ethers.providers.getNetwork('31337'),
  )

  const { chains, provider, webSocketProvider } = getWagmiChains()
  const client = createClient({
    autoConnect: true,
    // connectors: [
    //   new WalletConnectConnector({
    //     chains,
    //     options: {
    //       qrcode: true,
    //     },
    //   }),
    // ],
    provider: ethProvider,
    webSocketProvider,
  })
  return { client, chains }
}
