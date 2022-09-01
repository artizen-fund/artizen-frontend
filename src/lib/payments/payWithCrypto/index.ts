import { useState, useEffect } from 'react'
import watchBridge from './watchBridge'
import watchSwap from './watchSwap'
import initCryptoPayment from './initCryptoPayment'

const useCryptoPayment = (amount: number, donationMethod: DonationMethod) => {
  const [swappingStatus, setSwappingStatus] = useState<DonationStageStatus>('WAITING')
  const [swappingMessage, setSwappingMessage] = useState<string>('')
  const [bridgingStatus, setBridgingStatus] = useState<DonationStageStatus>('WAITING')
  const [bridgingMessage, setBridgingMessage] = useState<string>('')

  useEffect(() => {
    // initializes on load

    watchSwap(setSwappingStatus, setSwappingMessage)
    watchBridge(setBridgingStatus, setBridgingMessage)

    initCryptoPayment(amount, donationMethod)
  }, [])

  return [swappingStatus, swappingMessage, bridgingStatus, bridgingMessage] as const
}

export { useCryptoPayment }
