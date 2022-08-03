import { useState, useEffect } from 'react'
import watchBuild from './watchBuild'
import watchBridge from './watchBridge'
import watchSwap from './watchSwap'
import watchConfirm from './watchConfirm'
import initCryptoDonation from './initCryptoDonation'

type Status = 'WAITING' | 'PROCESSING' | 'COMPLETE'

export type CryptoStageFunction = (setStatus: (s: Status) => void, setMessage: (s: string) => void) => void

const useCryptoDonation = (amount: number, donationMethod: DonationMethod) => {
  const [swappingStatus, setSwappingStatus] = useState<Status>('WAITING')
  const [swappingMessage, setSwappingMessage] = useState<string>('')
  const [bridgingStatus, setBridgingStatus] = useState<Status>('WAITING')
  const [bridgingMessage, setBridgingMessage] = useState<string>('')
  const [buildingStatus, setBuildingStatus] = useState<Status>('WAITING')
  const [buildingMessage, setBuildingMessage] = useState<string>('')
  const [confirmingStatus, setConfirmingStatus] = useState<Status>('WAITING')
  const [confirmingMessage, setConfirmingMessage] = useState<string>('')

  useEffect(() => {
    // initializes on load

    watchSwap(setSwappingStatus, setSwappingMessage)
    watchBridge(setBridgingStatus, setBridgingMessage)
    watchBuild(setBuildingStatus, setBuildingMessage)
    watchConfirm(setConfirmingStatus, setConfirmingMessage)

    initCryptoDonation(amount, donationMethod)
  }, [])

  return [
    swappingStatus,
    swappingMessage,
    bridgingStatus,
    bridgingMessage,
    buildingStatus,
    buildingMessage,
    confirmingStatus,
    confirmingMessage,
  ] as const
}

export { useCryptoDonation }
