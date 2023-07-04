import { useContext, useState } from 'react'
import { useConnect, useSignMessage, Connector, useAccount } from 'wagmi'
import { useRouter } from 'next/router'
// import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useAuthRequestChallengeEvm } from '@moralisweb3/next'
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { assertInt, getWagmiClient, LayoutContext, assert } from '@lib'
import { signIn, useSession } from 'next-auth/react'

const useWalletAuthFlow = () => {
  const { toggleModal } = useContext(LayoutContext)
  const [messageToSign, setMessageToSign] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const { connectAsync, error, connect, connectors } = useConnect()

  console.log('connectors     ', connectors)

  console.log('useConnect  error  ', error)
  const { connector, isConnected } = useAccount()

  console.log('connector here ', connector)

  console.log('isConnected here ', isConnected)

  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      console.log('signMessage  onSuccess  data  ', data)

      signIn('moralis-auth', {
        message: variables.message,
        signature: data,
        redirect: false,
      })
    },
    onError(error) {
      console.log('error signMessage  ', error)
    },
  })
  const { status } = useSession()
  const { chains } = getWagmiClient()
  const { requestChallengeAsync } = useAuthRequestChallengeEvm()
  const router = useRouter()

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

      setMessageToSign(message)

      setConnecting(false)
      // Force reload due to JWT is not available or is still linked to old session when first created. Wagmi renders an error when the smart contracts are called.
      // router.reload()
    } catch (e) {
      setConnecting(false)
      console.error('error connecting user', e)
    }
  }

  const connectMetamask = () => {
    // toggleModal('connecting')
    const Metamaks = connectors.filter(connector => connector.name === 'MetaMask')[0]
    console.log('Metamaks connector  ', Metamaks)
    // connectWallet(Metamaks)

    connect({ connector: Metamaks })

    // connect()
  }

  const connectOtherWallet = () => {
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

  const connectWalletFlow = status !== 'authenticated' && !messageToSign && !isConnected

  const connectWalletFlowHappening = connectWalletFlow && connecting

  const signMessageFlow = !connectWalletFlow && messageToSign

  const currentFlow = connectWalletFlowHappening ? 'connecting' : signMessageFlow ? 'toSignMessage' : 'toConnect'

  return { connectMetamask, connectOtherWallet, connecting, signEnMessage, currentFlow, isAuthenticated }
}

export default useWalletAuthFlow
