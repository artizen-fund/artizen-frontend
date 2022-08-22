import { useState, useEffect } from 'react'
import watchBridge from './watchBridge'
import watchSwap from './watchSwap'
import initCryptoPayment from './initCryptoPayment'
import { StageStatus } from '@lib'

const useCryptoPayment = (amount: number, donationMethod: DonationMethod) => {
  const [swappingStatus, setSwappingStatus] = useState<StageStatus>('WAITING')
  const [swappingMessage, setSwappingMessage] = useState<string>('')
  const [bridgingStatus, setBridgingStatus] = useState<StageStatus>('WAITING')
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
