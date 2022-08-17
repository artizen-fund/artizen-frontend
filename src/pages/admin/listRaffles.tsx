import { Button, Layout } from '@components'
import { assert, useMagic } from '@lib'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import raffleAbi from 'src/contracts/RaffleAbi'
import styled from 'styled-components'

type Raffle = {
  raffleID: BigNumber
  tokenID: BigNumber
  startTime: BigNumber
  endTime: BigNumber
  tokenAllocation: BigNumber
  cancelled: boolean
  topDonatedAmount: BigNumber
}

const Admin = () => {
  const { magic } = useMagic()
  if (!magic) return <></>

  const [raffles, setRaffles] = useState<Raffle[]>()

  const raffleContractAddress = assert(
    process.env.NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS',
  )

  const magicWeb3Provider = new ethers.providers.Web3Provider(magic.rpcProvider as any)
  const signer = magicWeb3Provider.getSigner()
  const raflleContract = new ethers.Contract(raffleContractAddress, raffleAbi, signer)

  const loadRaffles = async () => {
    const raffleCount = await raflleContract.raffleCount()
    const raffles = []
    for (let i = 1; i <= raffleCount; i++) {
      const raffle = await raflleContract.raffles(i)
      raffles.push(raffle)
    }
    setRaffles(raffles)
  }

  useEffect(() => {
    loadRaffles()
  }, [])

  const cancelRaffle = async (raffleId: number) => {
    const cancelRaffleTransaction = await raflleContract.cancelRaffle(raffleId)
    await cancelRaffleTransaction.wait()
    loadRaffles()
  }

  const endRaffle = async (raffleId: number) => {
    const endRaffleTransaction = await raflleContract.sendRewards(raffleId)
    await endRaffleTransaction.wait()
    loadRaffles()
  }

  return (
    <Layout>
      <Wrapper>
        <Table>
          <thead>
            <tr>
              <th>Raffle Id</th>
              <th>Token Id</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Reward Token Allocation</th>
              <th>Top Donated Amount</th>
              <th>Cancelled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {raffles?.map((raffle, index) => {
              const endDateTime = new Date(raffle.endTime.toNumber() * 1000)
              const canBeCanceled =
                (raffle.topDonatedAmount.toNumber() === 0 || endDateTime > new Date()) && !raffle.cancelled
              const canBeEnded = endDateTime <= new Date() && !raffle.cancelled
              return (
                <tr key={index}>
                  <td>{raffle.raffleID.toNumber()}</td>
                  <td>{raffle.tokenID.toNumber()}</td>
                  <td>{new Date(raffle.startTime.toNumber() * 1000).toLocaleString()}</td>
                  <td>{endDateTime.toLocaleString()}</td>
                  <td>{raffle.tokenAllocation.toNumber()}</td>
                  <td>{raffle.topDonatedAmount.toNumber()}</td>
                  <td>{raffle.cancelled ? 'true' : 'false'}</td>
                  {canBeCanceled && (
                    <td>
                      <Button level={5} onClick={() => cancelRaffle(raffle.raffleID.toNumber())}>
                        Cancel
                      </Button>
                    </td>
                  )}
                  {canBeEnded && (
                    <td>
                      <Button level={5} onClick={() => endRaffle(raffle.raffleID.toNumber())}>
                        End
                      </Button>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Button level={2} href="/admin/createRaffle">
          Create Raffle
        </Button>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Table = styled.table`
  thead th {
    padding-right: 10px;
    padding-bottom: 10px;
  }
  tbody td {
    padding-right: 10px;
    text-align: center;
    padding-bottom: 10px;
  }
`

export default Admin
