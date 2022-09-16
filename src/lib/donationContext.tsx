import { createContext, useEffect, useState } from 'react'
import { useLoggedInUser } from '@lib'

export type DonationStatus = 'initiated' | 'processing' | 'completed' | ''

interface IDonationContext {
  donationStatus?: DonationStatus
  setDonationStatus?: (status: DonationStatus) => void
  donationStage: DonationStage
  setDonationStage?: (stage: DonationStage) => void
  visibleShelf?: HeaderShelfType
  setVisibleShelf?: (shelf: HeaderShelfType) => void
  toggleShelf?: (shelf?: HeaderShelfType) => void
}

export const DonationContext = createContext<IDonationContext>({ donationStage: 'setAmount' })

export const DonationContextProvider = ({ children }: SimpleComponentProps) => {
  const [loggedInUser] = useLoggedInUser()
  const [donationStatus, setDonationStatus] = useState<DonationStatus>('')
  const [donationStage, setDonationStage] = useState<DonationStage>('setAmount')
  const [visibleShelf, setVisibleShelf] = useState<HeaderShelfType>()
  const toggleShelf = (shelf?: HeaderShelfType) => setVisibleShelf(shelf === visibleShelf ? undefined : shelf)

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
