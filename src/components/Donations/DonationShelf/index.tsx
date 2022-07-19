import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon, DonationAmount, PaymentFiat, ProcessCrypto, Confirmation } from '@components'
import { rgba } from '@lib'
import { palette } from '@theme'

const DonationShelf = () => {
  const [stage, setStage] = useState<DonationStage>('setAmount')
  const [donationMethod, setDonationMethod] = useState<DonationMethod>('usd')
  const [amount, setAmount] = useState(10) // note: sort out integer or float

  const renderSwitch = (stage: DonationStage, donationMethod: DonationMethod) => {
    switch (stage) {
      // case 'login':
      // return <DonationAmount {...{ setStage }} />
      case 'payment':
        // todo: if donationMethod === 'polygon'
        // return <PaymentPolygon ... />
        // else if donationMethod === 'ethereum'
        // return <PaymentEthereum ... />
        // else
        return <PaymentFiat {...{ setStage, amount }} />
      case 'processCrypto':
        return <ProcessCrypto {...{ setStage }} />
      case 'confirmation':
        return <Confirmation />
      case 'setAmount':
      default:
        return <DonationAmount {...{ setStage, setDonationMethod, setAmount, amount }} />
    }
  }
  return renderSwitch(stage, donationMethod)
}

export default DonationShelf
