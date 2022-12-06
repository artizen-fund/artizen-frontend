import { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useMutation, useReactiveVar } from '@apollo/client'
import { assert, USDC_UNIT, loggedInUserVar, useReadContract, useWriteContract } from '@lib'
import { GrantsAbi } from '@contracts'
import { useMetaContract } from './useMetaContract'

export const useDonation = () => {
  const [buildingStatus, setBuildingStatus] = useState<DonationStageStatus>('WAITING')
  const [buildingMessage, setBuildingMessage] = useState<string>('')
  const [confirmingStatus, setConfirmingStatus] = useState<DonationStageStatus>('WAITING')
  const [confirmingMessage, setConfirmingMessage] = useState<string>('')

  const loggedInUser = useReactiveVar(loggedInUserVar)

  const { callStandardMetaTxMethod, callCustomMetaTxMethod, loading, error } = useMetaContract()

  const raffleContractAddress = assert(
    process.env.NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS',
  )

  const usdcContractAddress = assert(
    process.env.NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS',
  )

  const [callWriteContract] = useWriteContract()

  const { value: raffleId } = useReadContract(raffleContractAddress, GrantsAbi, 'raffleCount', [])

  // const [createDonation] = useMutation(CREATE_DONATION, {
  //   onError: error => {
  //     console.error('createDonation result    ', error)
  //   },
  // })

  useEffect(() => {
    if (loading) {
      setBuildingStatus('PROCESSING')
      setBuildingMessage('Building Donation')
    } else if (raffleId) {
      setBuildingStatus('COMPLETE')
      setBuildingMessage('Donation Built')
    }
  }, [loading, raffleId])

  const initDonation = async (amount: number, donationMethod: DonationMethod, fee: number, topUpId: string) => {
    if (loading) return
    setConfirmingStatus('PROCESSING')
    setConfirmingMessage('Confirming Donation')

    setConfirmingStatus('COMPLETE')
    setConfirmingMessage('Donation Confirmed')
  }

  return [initDonation, buildingStatus, buildingMessage, confirmingStatus, confirmingMessage] as const
}
