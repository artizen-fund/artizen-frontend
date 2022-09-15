import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { isServer, assert, assertInt, rgba, useReadContract, formatUSDC } from '@lib'
import { RaffleAbi } from '@contracts'
import {
  ISidebarDonatorsQuery,
  IGetDonationFromBlockchainQuery,
  IGetUsersByPublicAddressQuery,
  IDonationT,
  IUser,
} from '@types'
import { GET_DONATIONS_FROM_BLOCKCHAIN, GET_USERS_BY_PUBLIC_ADDRESSES } from '@gql'

const fundRaisingGoal = 25000 // TODO: environment variable?

type DonationWithUser = IDonationT & {
  user: IUser
}

type IRaffleId = {
  _hex: string
  _isBigNumber: boolean
}

interface ICampaignContext {
  fundRaisingGoal: number
  loading?: boolean
  raffle?: any
  startDate?: Date
  endDate?: Date
  totalRaised?: number
  donationCount?: number
  donationsWithUser?: Array<DonationWithUser>
}

const CampaignContext = createContext<ICampaignContext>({
  fundRaisingGoal,
})

export const CampaignProvider = ({ children }: SimpleComponentProps) => {
  if (isServer()) return children

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [addresses, setAddresses] = useState<Array<string>>([])
  const [donationsWithUser, setDonationsWithUser] = useState<Array<DonationWithUser>>()
  const [donationCount, setDonationCount] = useState(0)
  const [totalRaised, setTotalRaised] = useState(0)

  const raffleContractAddress = assert(
    process.env.NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS',
  )

  const { value: raffleId, loading: loadingRaffleId } = useReadContract<IRaffleId>(
    raffleContractAddress,
    RaffleAbi,
    'raffleCount',
    [],
  )

  useEffect(() => {
    if (!raffleId) return
    refetchRaffle()
  }, [raffleId])

  const {
    value: raffle,
    refetch: refetchRaffle,
    loading: loadingRaffle,
  } = useReadContract(raffleContractAddress, RaffleAbi, 'getRaffle', [raffleId], false)

  useEffect(() => {
    if (!raffle) return
    setStartDate(new Date(raffle?.startTime.toNumber() * 1000))
    setEndDate(new Date(raffle?.endTime.toNumber() * 1000))
  }, [raffle])

  const { data, loading } = useQuery<IGetDonationFromBlockchainQuery>(GET_DONATIONS_FROM_BLOCKCHAIN, {
    variables: { raffleId: raffleId?.['_hex'] },
    skip: !raffleId?.['_hex'],
    onError: error => console.error('error loading donation blockchain', error),
  })

  const { data: donorData, loading: loadingDonors } = useQuery<IGetUsersByPublicAddressQuery>(
    GET_USERS_BY_PUBLIC_ADDRESSES,
    {
      skip: !raffleId?.['_hex'] || loading,
      variables: { addresses },
      onError: error => console.error('error ', error),
    },
  )

  useEffect(() => {
    console.log('data', data, 'donorData', donorData)
    if (!data?.Donation?.donations || !donorData?.User) return
    const { donations } = data.Donation

    setDonationCount(donations.length)
    setTotalRaised(donations.filter(item => !!item).reduce((total, obj) => Number(obj?.amount) + total, 0))
    setAddresses(donations.map(donation => donation!.userAddress.toLowerCase()))

    setDonationsWithUser(
      donations.map(donation => ({
        ...donation,
        user: donorData.User.find(item => item.publicAddress?.toLowerCase() === donation!.userAddress.toLowerCase()),
      })) as Array<DonationWithUser>,
    )
  }, [data, donorData])

  return (
    <CampaignContext.Provider
      value={{
        fundRaisingGoal,
        raffle,
        loading: loadingRaffleId || loadingRaffle || loadingDonors,
        startDate,
        endDate,
        totalRaised,
        donationCount,
        donationsWithUser,
      }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export const useCampaign = () => useContext(CampaignContext)
