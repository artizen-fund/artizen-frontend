import { useState } from 'react'
import { DonationAmount, PaymentFiat, PaymentCrypto, ProcessCrypto, Confirmation } from '@components'

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
          return <PaymentCrypto {...{ donationMethod, amount, setStage }} />
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

export default DonationShelf
