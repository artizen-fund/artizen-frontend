import { useState } from 'react'
import { useConnect, useSignMessage, Connector, useDisconnect, useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useAuthRequestChallengeEvm } from '@moralisweb3/next'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { assertInt, getWagmiClient } from '@lib'
import { signIn } from 'next-auth/react'

const useWalletConnect = () => {
  const [connecting, setConnecting] = useState(false)
  const { connectAsync } = useConnect()
  const { isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const { chains } = getWagmiClient()
  const { requestChallengeAsync } = useAuthRequestChallengeEvm()
  const router = useRouter()

  const connectWallet = async (connector: Connector) => {
    if (isConnected) {
      await disconnectAsync()
    }
    setConnecting(true)
    const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')

    try {
      const { account: publicAddress, chain } = await connectAsync({
        connector,
        chainId,
      })

      const challenge = await requestChallengeAsync({ address: publicAddress, chainId: chain.id })
      if (!challenge) {
        throw new Error('failed walletconnect challenge')
      }
      const { message } = challenge

      const signature = await signMessageAsync({ message })
      const signinResponse = await signIn('moralis-auth', { message, signature, redirect: false, callbackUrl: '/user' })

      console.log('signinResponse  ', signinResponse)

      setConnecting(false)
      // Force reload due to JWT is not awailable or is still linked to old session when first created. Wagmi renders an error when the smart contracts are called.
      router.reload()
    } catch (e) {
      setConnecting(false)
      console.error('error connecting user', e)
    }
  }
  // new MetaMaskConnector({ chains: [goerli] })
  const connectMetamask = () => connectWallet(new MetaMaskConnector({ chains }))

  const connectOtherWallet = () =>
    connectWallet(
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    )

  return { connectMetamask, connectOtherWallet, connecting }
}

export default useWalletConnect
