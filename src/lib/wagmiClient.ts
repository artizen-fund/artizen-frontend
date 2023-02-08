import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { assert } from '@lib'

export const getWagmiChains = () => {
  const alchemyApiKey = assert(process.env.NEXT_PUBLIC_ALCHEMY_API, 'NEXT_PUBLIC_ALCHEMY_API')
  // const supportedChains = [mainnet, goerli]
  const supportedChains = [goerli]
  const { chains, provider, webSocketProvider } = configureChains(supportedChains, [
    alchemyProvider({ apiKey: alchemyApiKey }),
  ])

  return { chains, provider, webSocketProvider }
}

export const getWagmiClient = () => {
  const { chains, provider, webSocketProvider } = getWagmiChains()
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  })

  return { wagmiClient, chains }
}
