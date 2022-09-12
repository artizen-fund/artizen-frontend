import { createContext, useState } from 'react'

export type DonationStatus = 'initiated' | 'processing' | 'completed' | ''

interface IDonationContext {
  donationStatus?: DonationStatus
  setDonationStatus?: (status: DonationStatus) => void
  donationStage: DonationStage
  setDonationStage?: (stage: DonationStage) => void
}

export const DonationContext = createContext<IDonationContext>({ donationStage: 'setAmount' })

const DonationContextProvider = ({ children }: SimpleComponentProps) => {
  const [donationStatus, setDonationStatus] = useState<DonationStatus>('')
  const [donationStage, setDonationStage] = useState<DonationStage>('setAmount')
  return (
    <DonationContext.Provider value={{ donationStatus, setDonationStatus, donationStage, setDonationStage }}>
      {children}
    </DonationContext.Provider>
  )
}
export { DonationContextProvider }
export default DonationContext
