import { createContext, useEffect, useContext, useState } from 'react'
import { GET_LATEST_SWAP_VIA_ATTRIBUTE, GET_LATEST_TOP_UP_WALLET_VIA_ATTRIBUTE } from '@gql'
import { useLazyQuery } from '@apollo/client'
import { DonationContext } from './donationContext'
import { useProcessDonation } from './processDonation'
import { UserContext } from './userContext'

export const RecoverDonationContext = createContext({})

export const RecoverDonationProvider = ({ children }: SimpleComponentProps) => {
  const { setDonationStage } = useContext(DonationContext)
  const { setAmount, setOrder, setDonationMethod, setError, setCryptoStage, setSwapId } = useProcessDonation()
  const { loggedInUser } = useContext(UserContext)
  const [swap, setSwap] = useState<any>()

  const [fetchLatestTopUpWalletBySwap] = useLazyQuery(GET_LATEST_TOP_UP_WALLET_VIA_ATTRIBUTE, {
    variables: {
      attr: {
        swapId: { _eq: swap?.id },
        originFund: { _eq: 'ethereum' },
      },
    },
    onCompleted: async (topUpWalletData: { TopUpWallet: string | any[] }) => {
      if (topUpWalletData.TopUpWallet.length === 0) {
        const { amount, id } = swap
        setSwapId?.(id)
        setAmount?.(amount)
        setDonationMethod?.('ethereum')
        setError?.('Bridging Failed')
        setCryptoStage?.('bridging')
        setDonationStage?.('paymentFiatAddress')
      }
    },
    fetchPolicy: 'network-only',
  })

  const [fetchLatestSwap] = useLazyQuery(GET_LATEST_SWAP_VIA_ATTRIBUTE, {
    variables: {
      attr: {
        userId: { _eq: loggedInUser?.id },
        state: { _eq: 'COMPLETE' },
      },
    },
    onCompleted: async (swap: { Swaps: string | any[] }) => {
      if (swap.Swaps.length > 0) {
        setSwap(swap.Swaps[0])
        await fetchLatestTopUpWalletBySwap()
      }
    },
    fetchPolicy: 'network-only',
  })

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
          setAmount?.(amount)
          setOrder?.({ id: orderId })
          setDonationMethod?.(originFund)
          setError?.('Payment Failed')
          setDonationStage?.('processCrypto')
        } else {
          await fetchLatestSwap()
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
