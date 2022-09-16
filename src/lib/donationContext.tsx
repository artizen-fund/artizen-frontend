import { createContext, useEffect, useState } from 'react'
import { useLoggedInUser } from '@lib'

export type DonationStatus = 'initiated' | 'processing' | 'completed' | ''

export type HeaderShelf = 'session' | 'howItWorks' | 'donate' | 'donationGuide'

interface IDonationContext {
  donationStatus?: DonationStatus
  setDonationStatus?: (status: DonationStatus) => void
  donationStage: DonationStage
  setDonationStage?: (stage: DonationStage) => void
  visibleShelf?: HeaderShelf
  setVisibleShelf?: (shelf: HeaderShelf) => void
  toggleShelf?: (shelf?: HeaderShelf) => void
}

export const DonationContext = createContext<IDonationContext>({ donationStage: 'setAmount' })

export const DonationContextProvider = ({ children }: SimpleComponentProps) => {
  const [loggedInUser] = useLoggedInUser()
  const [donationStatus, setDonationStatus] = useState<DonationStatus>('')
  const [donationStage, setDonationStage] = useState<DonationStage>('setAmount')
  const [visibleShelf, setVisibleShelf] = useState<HeaderShelf>()
  const toggleShelf = (shelf?: HeaderShelf) => setVisibleShelf(shelf === visibleShelf ? undefined : shelf)

  useEffect(() => {
    if (visibleShelf === 'donate' && donationStage === 'login' && !loggedInUser) {
      setVisibleShelf('session')
    }
    if (visibleShelf === 'session' && donationStage === 'login' && !!loggedInUser) {
      setVisibleShelf('donate')
    }
  }, [donationStage, loggedInUser])

  return (
    <DonationContext.Provider
      value={{
        donationStatus,
        setDonationStatus,
        donationStage,
        setDonationStage,
        visibleShelf,
        setVisibleShelf,
        toggleShelf,
      }}
    >
      {children}
    </DonationContext.Provider>
  )
}
