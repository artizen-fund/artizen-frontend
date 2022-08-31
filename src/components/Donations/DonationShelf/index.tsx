import { useState } from 'react'
import { DonationAmount, PaymentFiat, PaymentCrypto, ProcessCrypto, Confirmation } from '@components'
import { WagmiConfig } from 'wagmi'
import { getWagmiClient } from '../../../lib/wagmiClient'

const { client, chains } = getWagmiClient()

export const DonationShelf = () => {
  const [stage, setStage] = useState<DonationStage>('setAmount')
  const [order, setOrder] = useState<{ id: string }>({ id: '' })
  const [donationMethod, setDonationMethod] = useState<DonationMethod>('usd')
  const [amount, setAmount] = useState(10) // note: sort out integer or float

  const renderSwitch = (stage: DonationStage, donationMethod: DonationMethod) => {
    switch (stage) {
      // case 'login':
      // return <DonationAmount {...{ setStage }} />
      case 'paymentFiat':
        if (donationMethod === 'usd') return <PaymentFiat {...{ setStage, amount, setOrder }} />
        else {
          return <PaymentCrypto {...{ donationMethod, amount, setStage, chains }} />
        }
      case 'processCrypto':
        return <ProcessCrypto {...{ donationMethod, amount, setStage, order, setOrder }} />
      case 'confirmation':
        return <Confirmation />
      case 'setAmount':
      default:
        return <DonationAmount {...{ setStage, setDonationMethod, donationMethod, setAmount, amount }} />
    }
  }
  return renderSwitch(stage, donationMethod)
}

const DonationShelfWithWagmi = (props: any) => (
  <WagmiConfig client={client}>
    <DonationShelf {...props} />
  </WagmiConfig>
)

export default DonationShelfWithWagmi
