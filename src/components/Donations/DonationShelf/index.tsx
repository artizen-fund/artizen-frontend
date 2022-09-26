import { useContext, useEffect } from 'react'
import { DonationAmount, PaymentFiat, PaymentCrypto, ProcessCrypto, Breadcrumbs } from '@components'
import { WagmiConfig } from 'wagmi'
import { DonationContext, useProcessDonation, ProcessDonationProvider, UserContext } from '@lib'
import { getWagmiClient } from '../../../lib/wagmiClient'
import { BreadcrumbStep } from '../../Breadcrumbs'

const { client, chains } = getWagmiClient()

export const DonationShelf = () => {
  const { donationStage, setDonationStage } = useContext(DonationContext)
  const { donationMethod } = useProcessDonation()
  const { loggedInUser } = useContext(UserContext)

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
        if (donationMethod === 'usd') return <PaymentFiat />
        return <PaymentCrypto {...{ chains }} />
      case 'processCrypto':
      case 'confirmation':
        return <ProcessCrypto />
      case 'setAmount':
      default:
        return <DonationAmount />
    }
  }
  type DonationStage = 'setAmount' | 'login' | 'payment' | 'paymentFiatAddress' | 'processCrypto' | 'confirmation'

  const breadcrumbs: Array<BreadcrumbStep<DonationStage>> = [
    {
      key: 'setAmount',
      label: 'Donation Amount',
      onClick: ['payment', 'paymentFiatAddress'].includes(donationStage)
        ? () => setDonationStage?.('setAmount')
        : undefined,
    },
    { key: 'login', label: 'Account Creation' },
    { key: 'payment', label: 'Payment Information' },
    { key: 'processCrypto', label: 'Creating Donation' },
    { key: 'confirmation', label: 'Confirmation' },
  ]

  return (
    <>
      <Breadcrumbs {...{ breadcrumbs }} currentStep={donationStage} />
      {renderSwitch(donationStage, donationMethod as DonationMethod)}
    </>
  )
}

const DonationShelfWithWagmi = (props: any) => (
  <WagmiConfig client={client}>
    <ProcessDonationProvider>
      <DonationShelf {...props} />
    </ProcessDonationProvider>
  </WagmiConfig>
)

export default DonationShelfWithWagmi
