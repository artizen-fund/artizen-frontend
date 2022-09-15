import { Button, Form } from '@components'
import { ArtizenERC1155, ArtToken, RaffleAbi } from '@contracts'
import { schema, uischema, initialState, FormState } from '@forms/admin'
import { assert, USDC_UNIT } from '@lib'
import { BigNumber, ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { useAccount, useContract, useSigner } from 'wagmi'

export const CreateRaffle = () => {
  const [data, setData] = useState<FormState>(initialState)
  const { reload } = useRouter()

  const { address, isConnected } = useAccount()
  const { data: signer, isError, isLoading } = useSigner()

  const nftContractAddress = assert(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, 'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS')
  const raffleContractAddress = assert(
    process.env.NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS',
  )

  const tokenRewardModuleContractAddress = assert(
    process.env.NEXT_PUBLIC_TOKEN_REWARD_MODULE_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_TOKEN_REWARD_MODULE_CONTRACT_ADDRESS',
  )

  const tokenRewardContractAddress = assert(
    process.env.NEXT_PUBLIC_TOKEN_REWARD_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_TOKEN_REWARD_CONTRACT_ADDRESS',
  )

  const nftContract = useContract({
    addressOrName: nftContractAddress,
    contractInterface: ArtizenERC1155,
    signerOrProvider: signer,
  })

  const raflleContract = useContract({
    addressOrName: raffleContractAddress,
    contractInterface: RaffleAbi,
    signerOrProvider: signer,
  })

  const tokenRewardContract = useContract({
    addressOrName: tokenRewardContractAddress,
    contractInterface: ArtToken,
    signerOrProvider: signer,
  })

  if (!isConnected) return <></>

  const handleSubmit = async () => {
    // Mint a new NFT
    const mintTransaction = await nftContract.mint(address, 4, '0x', data.tokenURI)
    await mintTransaction.wait()

    const latestTokenId = await nftContract.tokenIds()

    // Approve Raffle contract to use the new NFT
    const approvalTransaction = await nftContract.setApprovalForAll(raffleContractAddress, true)
    await approvalTransaction.wait()

    const raffle = {
      nftContract: nftContractAddress,
      nftOwner: address,
      raffleID: 0,
      tokenID: latestTokenId,
      startTime: Math.round(new Date(data.startTime).getTime() / 1000), // must be timestamp in seconds
      endTime: Math.round(new Date(data.endTime).getTime() / 1000), // must be timestamp in seconds
      donationCount: 0,
      minimumDonationAmount: ethers.utils.parseUnits(data.mimDonationAmount.toString(), USDC_UNIT),
      topDonor: '0x0000000000000000000000000000000000000000',
      topDonatedAmount: BigNumber.from(0),
      tokenAllocation: ethers.utils.parseUnits(data.tokenAllocation.toString()),
      tokenBuffer: ethers.utils.parseUnits(data.tokenAllocation.toString()),
      cancelled: false,
      ended: false,
    }

    // Create a new Raffle
    const raffleTransaction = await raflleContract.createRaffle(raffle)
    await raffleTransaction.wait()

    const raffleCount = await raflleContract.raffleCount()

    // Approve tokens to be used by raffle contract for reward
    const tokenRewardApproveTransaction = await tokenRewardContract.approve(
      raffleContractAddress,
      ethers.constants.MaxUint256,
    )
    await tokenRewardApproveTransaction.wait()

    // Turn on token rewards on the raffle contract
    const tokenRewardTransaction = await raflleContract.turnOnTokenRewards(
      tokenRewardModuleContractAddress,
      tokenRewardContractAddress,
      raffleCount,
    )
    await tokenRewardTransaction.wait()

    reload()
  }

  return (
    <Wrapper>
      <Form {...{ schema, uischema, data, setData }} />
      <Button onClick={handleSubmit}>Create Raffle</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export default CreateRaffle
