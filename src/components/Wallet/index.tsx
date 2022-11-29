import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { useAccount, useConnect, useSignMessage, Chain } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from '@components'
import { assertInt } from '@lib'
import { IGetUserQuery } from '@types'
import { GET_USER } from '@gql'

export const Wallet = ({ chains }: { chains: Array<Chain> }) => {
  const [publicAddress, setPublicAddress] = useState<string>()
  const { data } = useQuery<IGetUserQuery>(GET_USER, {
    variables: { publicAddress },
  })

  const { data: session } = useSession()
  useEffect(() => {
    console.log('session', session)
  }, [session])

  useEffect(() => {
    // todo: this is turning up empty, why?
    console.log('data', data)
  }, [data])

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

    const signinResponse = await signIn('credentials', { message, signature, redirect: false })

    setPublicAddress(account)
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
