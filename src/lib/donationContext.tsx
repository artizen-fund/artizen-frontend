import { createContext, useState } from 'react'

export type DonationStatus = 'initiated' | 'processing' | 'completed' | ''

interface IDonationContext {
  donationStatus?: DonationStatus
  setDonationStatus?: (status: DonationStatus) => void
}

export const DonationContext = createContext<IDonationContext>({})

const DonationContextProvider = ({ children }: SimpleComponentProps) => {
  const [donationStatus, setDonationStatus] = useState<DonationStatus>('')
  return <DonationContext.Provider value={{ donationStatus, setDonationStatus }}>{children}</DonationContext.Provider>
}
export { DonationContextProvider }
export default DonationContext
