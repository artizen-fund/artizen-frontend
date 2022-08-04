import { useState } from 'react'
import {
  DonationAmount,
  PaymentFiat,
  PaymentCrypto,
  PaymentFiatAddress,
  ProcessCrypto,
  Confirmation,
} from '@components'

const DonationShelf = () => {
  const [stage, setStage] = useState<DonationStage>('setAmount')
  const [donationMethod, setDonationMethod] = useState<DonationMethod>('usd')
  const [amount, setAmount] = useState(10) // note: sort out integer or float

  // TODO: did we overlook <PaymentCrypto /> ?
  const renderSwitch = (stage: DonationStage, donationMethod: DonationMethod) => {
    switch (stage) {
      // case 'login':
      // return <DonationAmount {...{ setStage }} />
      case 'paymentFiatAddress':
        return <PaymentFiatAddress {...{ setStage, amount }} />
      case 'paymentFiat':
        return <PaymentFiat {...{ setStage, amount }} />
      case 'processCrypto':
        return <ProcessCrypto {...{ setStage, donationMethod }} />
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
