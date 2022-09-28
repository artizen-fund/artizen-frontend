import { createContext, useEffect, useContext } from 'react'
import { GET_LATEST_TOP_UP_WALLET_VIA_ATTRIBUTE } from '@gql'
import { useLazyQuery } from '@apollo/client'
import { DonationContext } from './donationContext'
import { useProcessDonation } from './processDonation'
import { UserContext } from './userContext'

export const RecoverDonationContext = createContext({})

export const RecoverDonationProvider = ({ children }: SimpleComponentProps) => {
  const { setDonationStage } = useContext(DonationContext)
  const { setAmount, setOrder, setDonationMethod, setError } = useProcessDonation()
  const { loggedInUser } = useContext(UserContext)

  const [fetchLatestTopUpWallet] = useLazyQuery(GET_LATEST_TOP_UP_WALLET_VIA_ATTRIBUTE, {
    variables: {
      attr: {
        userId: { _eq: loggedInUser?.id },
      },
    },
    onCompleted: async (topUpWalletData: { TopUpWallet: string | any[] }) => {
      if (topUpWalletData.TopUpWallet.length > 0) {
        const { amount, orderId, originFund, state } = topUpWalletData.TopUpWallet[0]
        if (state === 'FAILED') {
          setDonationStage?.('processCrypto')
          setAmount?.(amount)
          setOrder?.({ id: orderId })
          setDonationMethod?.(originFund)
          setError?.('Payment Failed')
        }
      }
    },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    fetchLatestTopUpWallet()
  }, [])

  return <RecoverDonationContext.Provider value={{}}>{children}</RecoverDonationContext.Provider>
}
