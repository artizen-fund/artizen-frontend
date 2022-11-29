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

    console.log('message ', message)

    const signature = await signMessageAsync({ message })

    const signInResponse = await signIn('credentials', { message, signature, redirect: false })

    // todo: Apollo.getUser( { publicAddress: address from above } )

    // console.log('signInResponse', signInResponse)
  }

  return <div>{!isConnected ? <Button onClick={connectWallet}>Connect Metamask</Button> : 'Metamask Connected'}</div>
}

export default Wallet
