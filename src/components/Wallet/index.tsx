import { useSession, signIn, signOut } from 'next-auth/react'
import { useApolloClient } from '@apollo/client'
import { useAccount, useConnect, useSignMessage, Chain } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from '@components'
import { assertInt, loggedInUserVar } from '@lib'
import { IGetUserQuery } from '@types'
import { GET_USER } from '@gql'

export const Wallet = ({ chains }: { chains: Array<Chain> }) => {
  const apolloClient = useApolloClient()
  const { data: session } = useSession()

  const { connectAsync } = useConnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const connectWallet = async () => {
    const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
    const { account: publicAddress, chain } = await connectAsync({
      connector: new InjectedConnector({ chains }),
      chainId,
    })

    const userData = { address: publicAddress.toLowerCase(), chain: chain.id, network: 'evm' }

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

    const userFromDB = await apolloClient.query<IGetUserQuery>({
      query: GET_USER,
      variables: { publicAddress: publicAddress.toLowerCase() },
    })

    if (userFromDB.data.Users.length < 1) {
      throw new Error('Error: user record not found')
    }

    loggedInUserVar(userFromDB.data.Users[0])
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
