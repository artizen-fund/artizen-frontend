import { Button } from '@components'
import { assertInt } from '@lib'
import { useRouter } from 'next/router'
import { useAccount, useConnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { signIn } from 'next-auth/react'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '@gql'
import { IGetUserQuery } from '@types'

interface WalletProps {
  chains: any
}

export const Wallet = ({ chains }: WalletProps) => {
  const { connectAsync } = useConnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { push } = useRouter()

  // this should query a locally stored publicAddress instead of an ID
  const [loadUser, { called, loading, data, error }] = useLazyQuery<IGetUserQuery>(GET_USER, {
    variables: {
      id: '9ddf4806-0f2c-4f62-8e52-838e89b43f3d ',
    },
  })

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
    const loginResponse = await signIn('credentials', { message, signature, redirect: false, callbackUrl: '/' })
    console.log('loginResponse', loginResponse)
    // loadUser()
  }

  return <div>{!isConnected ? <Button onClick={connectWallet}>Connect Metamask</Button> : 'Metamask Connected'}</div>
}

export default Wallet
