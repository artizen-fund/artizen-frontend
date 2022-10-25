import PaymentCryptoConnect from './'
import { WagmiConfig } from 'wagmi'
import { getWagmiClient } from '../../../lib/wagmiClient'

const { client } = getWagmiClient()

export default {
  title: 'donations/PaymentCryptoConnect',
  component: PaymentCryptoConnect,
  argTypes: {},
}

export const PaymentCryptoConnectComponent = (props: any) => {
  const amount = 1000
  return (
    <WagmiConfig client={client}>
      <PaymentCryptoConnect {...props} {...{ amount }} />
    </WagmiConfig>
  )
}
