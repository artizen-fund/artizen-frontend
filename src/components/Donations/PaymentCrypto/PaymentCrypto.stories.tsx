import PaymentCrypto from './'
import { WagmiConfig } from 'wagmi'
import { getWagmiClient } from '../../../lib/wagmiClient'

const { client } = getWagmiClient()

export default {
  title: 'donations/PaymentCrypto',
  component: PaymentCrypto,
  argTypes: {},
}

export const PaymentCryptoComponent = (props: any) => {
  const amount = 1000
  return (
    <WagmiConfig client={client}>
      <PaymentCrypto {...props} {...{ amount }} />
    </WagmiConfig>
  )
}
