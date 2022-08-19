import { useState } from 'react'
import { DonationAmount, PaymentFiat, PaymentCrypto, ProcessCrypto, Confirmation } from '@components'
import { configureChains, chain, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { assert } from '@lib'

const alchemyApiKey = assert(process.env.NEXT_PUBLIC_ALCHEMY_API, 'NEXT_PUBLIC_ALCHEMY_API')
const supportedChains = [chain.mainnet, chain.polygon, chain.ropsten, chain.goerli, chain.polygonMumbai]
const { chains, provider, webSocketProvider } = configureChains(supportedChains, [
  alchemyProvider({ apiKey: alchemyApiKey }),
])

const client = createClient({
  provider,
  webSocketProvider,
})

const DonationShelf = () => {
  const [stage, setStage] = useState<DonationStage>('setAmount')
  const [order, setOrder] = useState<{ id: string }>({ id: '' })
  const [donationMethod, setDonationMethod] = useState<DonationMethod>('usd')
  const [amount, setAmount] = useState(10) // note: sort out integer or float

  // TODO: did we overlook <PaymentCrypto /> ?
  const renderSwitch = (stage: DonationStage, donationMethod: DonationMethod) => {
    switch (stage) {
      // case 'login':
      // return <DonationAmount {...{ setStage }} />
      case 'paymentFiat':
        if (donationMethod === 'usd') return <PaymentFiat {...{ setStage, amount, setOrder }} />
        else {
          return <PaymentCrypto {...{ donationMethod, amount, setStage, chains, setOrder }} />
        }
      case 'processCrypto':
        return <ProcessCrypto {...{ setStage, donationMethod, order, amount, setOrder }} />
      case 'confirmation':
        return <Confirmation />
      case 'setAmount':
      default:
        return <DonationAmount {...{ setStage, setDonationMethod, donationMethod, setAmount, amount }} />
    }
  }
  return <WagmiConfig client={client}>{renderSwitch(stage, donationMethod)}</WagmiConfig>
}

export default DonationShelf
