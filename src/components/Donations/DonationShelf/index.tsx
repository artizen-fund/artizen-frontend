import { useContext, useEffect } from 'react'
import {
  DonationAmount,
  PaymentFiat,
  PaymentCryptoPick,
  PaymentCryptoConnect,
  ProcessCrypto,
  Breadcrumbs,
  PaymentFiatAddress,
} from '@components'
import { WagmiConfig } from 'wagmi'
import { LayoutContext, useProcessDonation, ProcessDonationProvider, UserContext, RecoverDonationProvider } from '@lib'
import { getWagmiClient } from '../../../lib/wagmiClient'
import { BreadcrumbStep } from '../../Breadcrumbs'

const { client, chains } = getWagmiClient()

export const DonationShelf = () => {
  const { donationStage, setDonationStage } = useContext(LayoutContext)
  const { donationMethod } = useProcessDonation()
  const { loggedInUser } = useContext(UserContext)

  useEffect(() => {
    if (!!loggedInUser && donationStage === 'login') {
      // user is logged in, proceed to payment
      if (donationMethod === 'usd') {
        setDonationStage?.('paymentFiatAddress')
      } else {
        setDonationStage?.('paymentCryptoPick')
      }
    }
  }, [loggedInUser, donationStage])

  const renderSwitch = (donationStage: DonationStage) => {
    switch (donationStage) {
      case 'login':
        return
      case 'paymentFiatAddress':
        return <PaymentFiatAddress />
      case 'paymentFiat':
        return <PaymentFiat />
      case 'paymentCryptoPick':
        return <PaymentCryptoPick />
      case 'paymentCryptoConnect':
        return <PaymentCryptoConnect />
      case 'processCrypto':
      case 'confirmation':
        return <ProcessCrypto />
      case 'setAmount':
      default:
        return <DonationAmount />
    }
  }

  const breadcrumbs: Array<BreadcrumbStep<DonationStage>> = [
    {
      key: 'setAmount',
      label: 'Donation Amount',
      onClick: ['payment', 'paymentFiatAddress'].includes(donationStage)
        ? () => setDonationStage?.('setAmount')
        : undefined,
    },
    { key: 'login', label: 'Account Creation' },
    { key: 'processCrypto', label: 'Creating Donation' },
    { key: 'confirmation', label: 'Confirmation' },
  ]

  if (donationStage === 'login') return <></>
  return (
    <>
      <Breadcrumbs {...{ breadcrumbs }} currentStep={donationStage} />
      {renderSwitch(donationStage)}
    </>
  )
}

const DonationShelfWithWagmi = (props: any) => (
  <WagmiConfig client={client}>
    <ProcessDonationProvider chains={chains}>
      <RecoverDonationProvider>
        <DonationShelf {...props} />
      </RecoverDonationProvider>
    </ProcessDonationProvider>
  </WagmiConfig>
)

export default DonationShelfWithWagmi
