import { useState } from 'react'
import { useConnect, useSignMessage, useAccount, useDisconnect } from 'wagmi'
import { ConnectResult } from '@wagmi/core'
import { useRouter } from 'next/router'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { signIn } from 'next-auth/react'
import { useAuthRequestChallengeEvm } from '@moralisweb3/next'

const useWalletConnect = () => {
  const [connecting, setConnecting] = useState(false)
  const { connectAsync } = useConnect()
  const { signMessageAsync } = useSignMessage()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const router = useRouter()
  const { requestChallengeAsync } = useAuthRequestChallengeEvm()

  const connectWallet = async ({ account, chain }: ConnectResult) => {
    if (isConnected) {
      await disconnectAsync()
    }
    setConnecting(true)

    try {
      console.log('derp', {
        address: account,
        chainId: chain.id,
      })
      const challengeResponse = await requestChallengeAsync({
        address: account,
        chainId: chain.id,
      })
      console.log('dorp')
      if (!challengeResponse) {
        throw new Error('Error answering challenge')
      }
      const { message } = challengeResponse
      const signature = await signMessageAsync({ message })

      await signIn('credentials', { message, signature, redirect: false })
      // await signIn('moralis-auth', ...)

      // NOTE: this is necessary because of some Metamask logout bug that I don't understand.
      // Ruben: please document. -EJ
      setConnecting(false)
      router.reload()
    } catch (e) {
      setConnecting(false)
      console.error('error connecting user', e)
    }
  }

  const connectMetamask = async () => {
    const connectArgs = await connectAsync({
      connector: new MetaMaskConnector(),
    })
    connectWallet(connectArgs)
  }

  const connectOtherWallet = async () => {
    const connectArgs = await connectAsync({
      connector: new WalletConnectConnector({
        options: {
          qrcode: true,
        },
      }),
    })
    connectWallet(connectArgs)
  }

  return { connectMetamask, connectOtherWallet, connectWallet, connecting }
}

export default useWalletConnect
