import { Button } from '@components'
import { assertInt } from '@lib'
import { useRouter } from 'next/router'
import { useAccount, useConnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { signIn } from 'next-auth/react'

interface WalletProps {
  chains: any
}

export const Wallet = ({ chains }: WalletProps) => {
  const { connectAsync } = useConnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { push } = useRouter()

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

    // redirect user after success authentication to '/user' page
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { url } = await signIn('credentials', { message, signature, redirect: false, callbackUrl: '/' })
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url)
  }

  return <div>{!isConnected ? <Button onClick={connectWallet}>Connect Metamask</Button> : 'Metamask Connected'}</div>
}

export default Wallet
