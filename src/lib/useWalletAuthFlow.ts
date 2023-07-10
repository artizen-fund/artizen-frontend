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
  const { toggleModal } = useContext(LayoutContext)
  const [messageToSign, setMessageToSign] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const { connectAsync, error, connect, connectors } = useConnect()
  const { connector, isConnected } = useAccount()
  const [currentFlow, setCurrentFlow] = useState(isConnected ? 'toSignMessage' : 'toConnect')

  console.log('currentFlow in useWalletAuth ', currentFlow)
  const { requestChallengeAsync } = useAuthRequestChallengeEvm()

  const router = useRouter()
  const { status } = useSession()

  // console.log('connectors     ', connectors)

  // console.log('useConnect  error  ', error)

  // console.log('connector here ', connector)

  // console.log('isConnected here ', isConnected)

  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      console.log('signMessage  onSuccess  data  ', data)

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

  const signEnMessage = () => {
    console.log('signEnMessage  ', messageToSign)
    if (!messageToSign) {
      throw new Error('no message to sign')
    }
    signMessage({ message: messageToSign })
  }

  const connectWallet = async (connector: Connector) => {
    // setConnecting(true)
    const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')

    try {
      const { account: publicAddress, chain } = await connectAsync({
        connector,
        chainId,
      })

      setConnecting(true)

      const challenge = await requestChallengeAsync({ address: publicAddress, chainId: chain.id })

      if (!challenge) {
        throw new Error('failed walletconnect challenge')
      }
      const { message } = challenge

      console.log('message here ', message)

      setMessageToSign(message)

      setConnecting(false)

      console.log('after the call, connecting     ', connecting)

      // const connectWalletFlow = status !== 'authenticated' && !message

      // const connectWalletFlowHappening = connectWalletFlow && connecting

      // const signMessageFlow = !connectWalletFlow && messageToSign

      // const currentFlowLocal = connectWalletFlowHappening
      //   ? 'connecting'
      //   : signMessageFlow
      //   ? 'toSignMessage'
      //   : 'toConnect'

      setCurrentFlow('toSignMessage')

      // console.log('from connectWallet, currentFlowLocal  ', currentFlowLocal)

      // return message

      // Force reload due to JWT is not available or is still linked to old session when first created. Wagmi renders an error when the smart contracts are called.
      // router.reload()
    } catch (e) {
      // setConnecting(false)
      console.error('error connecting user', e)
    }
  }

  const connectMetamask = () => {
    // toggleModal('connecting')
    const Metamaks = connectors.filter(connector => connector.name === 'MetaMask')[0]
    console.log('Metamaks connector  ', Metamaks)
    connectWallet(Metamaks)
    // connect({ connector: Metamaks })
    // connect()
  }

  const connectOtherWallet = () => {
    const WalletConnect = connectors.filter(connector => connector.name === 'WalletConnect')[0]
    console.log('Metamaks connector  ', WalletConnect)
    connectWallet(WalletConnect)
    // toggleModal('connecting')
    // connectWallet(
    //   new WalletConnectConnector({
    //     chains,
    //     options: {
    //       showQrModal: true,
    //       projectId: assert(process.env.NEXT_PUBLIC_WALLET_CONNECTOR_ID, 'NEXT_PUBLIC_WALLET_CONNECTOR_ID'),
    //     },
    //   }),
    // )
  }

  const isAuthenticated = () => status === 'authenticated'

  return { connectMetamask, connectOtherWallet, connecting, signEnMessage, currentFlow, isAuthenticated }
}

export default useWalletAuthFlow
