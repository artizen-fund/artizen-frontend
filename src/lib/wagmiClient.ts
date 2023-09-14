import { createConfig, configureChains } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import { assert } from '@lib'

export const getWagmiChains = () => {
  const alchemyApiKey = assert(process.env.NEXT_PUBLIC_ALCHEMY_API, 'NEXT_PUBLIC_ALCHEMY_API')
  const supportedChains = [mainnet, goerli]
  const { chains, publicClient, webSocketPublicClient } = configureChains(supportedChains, [
    alchemyProvider({ apiKey: alchemyApiKey }),
    publicProvider(),
  ])
  return { chains, publicClient, webSocketPublicClient }
}

export const getWagmiClient = () => {
  const { chains, publicClient, webSocketPublicClient } = getWagmiChains()

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
      new MetaMaskConnector({ chains }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          showQrModal: true,
          projectId: assert(process.env.NEXT_PUBLIC_WALLET_CONNECTOR_ID, 'NEXT_PUBLIC_WALLET_CONNECTOR_ID'),
        },
      }),
    ],
  })
  return { config, chains }
}
