import { useState, useContext, useEffect } from 'react'
import { DonationAmount, PaymentFiat, PaymentCrypto, ProcessCrypto, Confirmation } from '@components'
import { WagmiConfig } from 'wagmi'
import { useLoggedInUser, DonationContext } from '@lib'
import { getWagmiClient } from '../../../lib/wagmiClient'

const { client, chains } = getWagmiClient()

export const DonationShelf = () => {
  const { donationStage, setDonationStage } = useContext(DonationContext)
  const [order, setOrder] = useState<{ id: string }>({ id: '' })
  const [donationMethod, setDonationMethod] = useState<DonationMethod>('usd')
  const [amount, setAmount] = useState(10) // note: sort out integer or float
  const [loggedInUser] = useLoggedInUser()

  useEffect(() => {
    if (donationStage === 'login' && !!loggedInUser) {
      setDonationStage?.('payment')
    }
  }, [donationStage, loggedInUser])

  const renderSwitch = (donationStage: DonationStage, donationMethod: DonationMethod) => {
    switch (donationStage) {
      case 'login':
        return <></>
      case 'payment':
        if (donationMethod === 'usd') return <PaymentFiat {...{ amount, setOrder }} />
        return <PaymentCrypto {...{ donationMethod, amount, chains }} />
      case 'processCrypto':
        return <ProcessCrypto {...{ donationMethod, amount, order, setOrder }} />
      case 'confirmation':
        return <Confirmation />
      case 'setAmount':
      default:
        return <DonationAmount {...{ setDonationMethod, donationMethod, setAmount, amount }} />
    }
  }
  return renderSwitch(donationStage, donationMethod)
}

const DonationShelfWithWagmi = (props: any) => (
  <WagmiConfig client={client}>
    <DonationShelf {...props} />
  </WagmiConfig>
)

export default DonationShelfWithWagmi
