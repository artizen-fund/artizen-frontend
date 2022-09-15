import { Button } from '@components'
import { assertInt } from '@lib'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

interface WalletProps {
  chains: any
}

export const Wallet = ({ chains }: WalletProps) => {
  const { connect } = useConnect()
  const { isConnected } = useAccount()

  const connectWallet = () => {
    const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
    connect({
      connector: new InjectedConnector({ chains }),
      chainId,
    })
  }

  return <div>{!isConnected ? <Button onClick={connectWallet}>Connect Metamask</Button> : 'Metamask Connected'}</div>
}

export default Wallet
