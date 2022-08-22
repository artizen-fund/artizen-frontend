import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { assert, USDC_UNIT, userMetadataVar, useLoggedInUser, useReadContract, useWriteContract } from '@lib'
import { USDCAbi, RaffleAbi } from '@contracts'
import { useMutation, useReactiveVar } from '@apollo/client'
import { StageStatus } from './StageFunction'
import { useMetaContract } from './useMetaContract'
import { CREATE_DONATION } from '@gql'

export const useDonation = () => {
  const [buildingStatus, setBuildingStatus] = useState<StageStatus>('WAITING')
  const [buildingMessage, setBuildingMessage] = useState<string>('')
  const [confirmingStatus, setConfirmingStatus] = useState<StageStatus>('WAITING')
  const [confirmingMessage, setConfirmingMessage] = useState<string>('')

  const [loggedInUser] = useLoggedInUser()
  const metadata = useReactiveVar(userMetadataVar)

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

  const { value: raffleId } = useReadContract(raffleContractAddress, RaffleAbi, 'raffleCount', [])

  const [createDonation] = useMutation(CREATE_DONATION, {
    onError: error => {
      console.error('createDonation result    ', error)
    },
  })

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

    const amountInUSDC = ethers.utils.parseUnits(amount.toString(), USDC_UNIT)
    const chainID = assert(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')

    let approveReceipt = null
    // check if it is MATIC mainnet
    if (chainID === '137') {
      approveReceipt = await callCustomMetaTxMethod(
        usdcContractAddress,
        USDCAbi,
        metadata?.publicAddress as string,
        'approve',
        [raffleContractAddress, amountInUSDC],
      )
    } else {
      approveReceipt = await callWriteContract(usdcContractAddress, USDCAbi, 'approve', [
        raffleContractAddress,
        amountInUSDC,
      ])
    }

    if (approveReceipt.hash || approveReceipt.transactionHash) {
      const donation = {
        donor: metadata?.publicAddress as string,
        raffleID: raffleId,
        amount: amountInUSDC,
        timestamp: Math.round(new Date().getTime() / 1000),
      }

      const donateReceipt = await callStandardMetaTxMethod(
        raffleContractAddress,
        RaffleAbi,
        metadata?.publicAddress as string,
        'donate',
        [donation],
      )

      await createDonation({
        variables: {
          data: {
            userId: loggedInUser?.id,
            amount,
            fee,
            type: donationMethod,
            state: 'INITIATED',
            txHash: donateReceipt.hash,
            topUpId,
            timestamp: new Date().getTime(),
          },
        },
      })

      setConfirmingStatus('COMPLETE')
      setConfirmingMessage('Donation Confirmed')
    }
  }

  return [initDonation, buildingStatus, buildingMessage, confirmingStatus, confirmingMessage] as const
}
