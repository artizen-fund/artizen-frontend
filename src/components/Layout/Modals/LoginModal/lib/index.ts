import { useState } from 'react'
import { useConnect, useSignMessage, Connector } from 'wagmi'
import { useRouter } from 'next/router'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { assertInt, getWagmiClient } from '@lib'
import { signIn } from 'next-auth/react'

const useWalletConnect = () => {
  const [connecting, setConnecting] = useState(false)
  const { connectAsync } = useConnect()
  const { signMessageAsync } = useSignMessage()
  const { chains } = getWagmiClient()
  const router = useRouter()

  console.log('gets here')

  const connectWallet = async (connector: Connector) => {
    setConnecting(true)
    const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')

    try {
      const { account: publicAddress, chain } = await connectAsync({
        connector,
        chainId,
      })

      const userData = { address: publicAddress, chain: chain.id, network: 'evm' }
      // todo: should "evm" be a constant? What does it mean?

      const response = await fetch('/api/auth/request-message', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'content-type': 'application/json',
        },
      })

      const { message } = await response.json()
      const signature = await signMessageAsync({ message })

      await signIn('credentials', { message, signature, redirect: false })

      // NOTE: this is necessary because of some Metamask logout bug that I don't understand.
      // Ruben: please document. -EJ
      setConnecting(false)
      router.reload()
    } catch (e) {
      setConnecting(false)
      console.error('error connecting user', e)
    }
  }

  const connectMetamask = () => connectWallet(new InjectedConnector({ chains }))

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
