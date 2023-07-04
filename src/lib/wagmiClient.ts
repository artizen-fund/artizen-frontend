//TODO: these imports should go to @wagmi/core instead, see here
// https://github.com/wagmi-dev/wagmi/issues/1948
import { createConfig, configureChains } from 'wagmi'
// import { configureChains } from '@wagmi/core'
import { createPublicClient, http } from 'viem'
// import { goerli, mainnet } from '@wagmi/core/chains'
import { goerli, mainnet } from 'wagmi/chains'
// import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { WalletConnectConnector } from '@wagmi/connectors/walletConnect'
// import { InjectedConnector } from '@wagmi/core/connectors/injected'
// import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
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
      // new InjectedConnector({
      //   chains,
      //   options: {
      //     name: 'Injected',
      //     shimDisconnect: true,
      //   },
      // }),
      // new WalletConnectConnector({
      //   chains,
      //   options: {
      //     showQrModal: true,
      //     projectId: assert(process.env.NEXT_PUBLIC_WALLET_CONNECTOR_ID, 'NEXT_PUBLIC_WALLET_CONNECTOR_ID'),
      //   },
      // }),
    ],
  })
  return { config, chains }
}
