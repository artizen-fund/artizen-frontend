import { useSession, signIn, signOut } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, Chain } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from '@components'
import { assertInt } from '@lib'

export const Wallet = ({ chains }: { chains: Array<Chain> }) => {
  const { data: session } = useSession()

  const { connectAsync } = useConnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const connectWallet = async () => {
    const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector({ chains }),
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

    await signIn('credentials', { message, signature, redirect: false })
  }

  return (
    <div>
      <Button onClick={connectWallet} disabled={isConnected && !session}>
        {!isConnected ? 'Connect Metamask' : !session ? 'Connecting…' : 'Donate'}
      </Button>
      {!!session && <p onClick={() => signOut()}>sign out</p>}
    </div>
  )
}

export default Wallet
