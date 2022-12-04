import { useSession, signIn, signOut } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, Chain, Connector } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from '@components'
import { assertInt } from '@lib'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'

export const Wallet = ({ chains }: { chains: Array<Chain> }) => {
  const { data: session } = useSession()

  console.log('user session')

  const { connectAsync } = useConnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const connectWallet = async (connector: Connector) => {
    const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
    const { account, chain } = await connectAsync({
      connector,
      chainId,
    })

    const userData = { address: account, chain: chain.id, network: 'evm' }

    const response = await fetch('/api/auth/request-message', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'content-type': 'application/json',
      },
    })

    const { message } = await response.json()
    const signature = await signMessageAsync({ message })
    console.log('user is signing to next-auth/react ')
    await signIn('credentials', { message, signature, redirect: false })
  }

  return (
    <div>
      <Button onClick={() => connectWallet(new InjectedConnector({ chains }))} disabled={isConnected && !session}>
        {!isConnected ? 'Connect Metamask' : !session ? 'Connecting…' : 'Connected'}
      </Button>
      <Button
        onClick={() =>
          connectWallet(
            new WalletConnectConnector({
              chains,
              options: {
                qrcode: true,
              },
            }),
          )
        }
        disabled={isConnected && !session}
      >
        {!isConnected ? 'Connect With WalletConnect' : !session ? 'Connecting…' : 'Connected'}
      </Button>
      {!!session && <p onClick={() => signOut()}>sign out</p>}
    </div>
  )
}

export default Wallet
