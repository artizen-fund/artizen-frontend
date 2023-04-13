import { useContext, useState } from 'react'
import { useConnect, useSignMessage, Connector, useDisconnect, useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useAuthRequestChallengeEvm } from '@moralisweb3/next'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { assertInt, getWagmiClient, LayoutContext } from '@lib'
import { signIn } from 'next-auth/react'

const useWalletConnect = () => {
  const { toggleModal } = useContext(LayoutContext)
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
      await signIn('moralis-auth', { message, signature, redirect: false, callbackUrl: '/user' })

      setConnecting(false)
      // Force reload due to JWT is not available or is still linked to old session when first created. Wagmi renders an error when the smart contracts are called.
      router.reload()
    } catch (e) {
      setConnecting(false)
      console.error('error connecting user', e)
    }
  }
  const connectMetamask = () => {
    toggleModal('connecting')
    connectWallet(new MetaMaskConnector({ chains }))
  }

  const connectOtherWallet = () => {
    toggleModal('connecting')
    connectWallet(
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          projectId: '1cfa6214f74719cb6dccea797e0ff417',
        },
      }),
    )
  }

  return { connectMetamask, connectOtherWallet, connecting }
}

export default useWalletConnect
