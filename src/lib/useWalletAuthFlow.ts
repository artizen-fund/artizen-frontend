import { useContext, useState } from 'react'
import { useConnect, useSignMessage, Connector, useAccount } from 'wagmi'
import { useRouter } from 'next/router'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useAuthRequestChallengeEvm } from '@moralisweb3/next'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { assertInt, getWagmiClient, LayoutContext, assert } from '@lib'
import { signIn, useSession } from 'next-auth/react'

//NOTES: Using const { status } = useSession() create many wallet connect sessions and html widget
// <wcm-modal></wcm-modal>
export const useWalletAuthFlow = () => {
  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
  const { toggleModal } = useContext(LayoutContext)
  const [messageToSign, setMessageToSign] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const { connectAsync, error, connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()

  const [currentFlow, setCurrentFlow] = useState(isConnected ? 'toSignMessage' : 'toConnect')

  const { requestChallengeAsync } = useAuthRequestChallengeEvm()

  console.log('error connecting user in main area', error)

  const router = useRouter()
  const { status } = useSession()

  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      signIn('moralis-auth', {
        message: variables.message,
        signature: data,
        redirect: false,
      })

      setCurrentFlow('allDoneConnected')
    },
    onError(error) {
      console.log('error signMessage  ', error)
    },
  })

  const signEnMessage = async () => {
    let message = messageToSign

    if (!messageToSign && address) {
      message = await createChallenge(address)
    }
    message && signMessage({ message })
  }

  const createChallenge = async (address: `0x${string}`) => {
    const challenge = await requestChallengeAsync({ address, chainId })

    if (!challenge) {
      throw new Error('failed walletconnect challenge')
    }
    const { message } = challenge

    setMessageToSign(message)

    return message
  }

  const connectWallet = async (connector: Connector) => {
    // setConnecting(true)

    try {
      const { account: publicAddress, chain } = await connectAsync({
        connector,
        chainId,
      })

      setConnecting(true)

      await createChallenge(publicAddress)

      setConnecting(false)

      setCurrentFlow('toSignMessage')
    } catch (e) {
      console.error('error connecting user', e)
    }
  }

  const connectMetamask = () => {
    const Metamaks = connectors.filter(connector => connector.name === 'MetaMask')[0]

    connectWallet(Metamaks)
  }

  const connectOtherWallet = () => {
    const WalletConnect = connectors.filter(connector => connector.name === 'WalletConnect')[0]

    console.log('WalletConnect ::::: ', WalletConnect)

    connectWallet(WalletConnect)
  }

  const isAuthenticated = (): boolean => status === 'authenticated'

  return { connectMetamask, connectOtherWallet, connecting, signEnMessage, currentFlow, isAuthenticated }
}

export default useWalletAuthFlow
