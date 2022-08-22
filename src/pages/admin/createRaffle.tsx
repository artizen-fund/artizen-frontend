import { Button, Form, Layout } from '@components'
import { ArtizenERC1155, ArtToken, RaffleAbi } from '@contracts'
import { schema, uischema, initialState, FormState } from '@forms/admin'
import { assert, useMagic } from '@lib'
import { BigNumber, ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'

const CreateRaffle = () => {
  const [data, setData] = useState<FormState>(initialState)
  const { push } = useRouter()
  const { magic } = useMagic()
  if (!magic) return <></>

  const handleSubmit = async () => {
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

    const magicWeb3Provider = new ethers.providers.Web3Provider(magic.rpcProvider as any)

    const signer = magicWeb3Provider.getSigner()
    const walletAddress = await signer.getAddress()

    const nftContract = new ethers.Contract(nftContractAddress, ArtizenERC1155, signer)

    // Mint a new NFT
    const mintTransaction = await nftContract.mint(walletAddress, 4, '0x', data.tokenURI)
    await mintTransaction.wait()

    const latestTokenId = await nftContract.tokenIds()

    // Approve Raffle contract to use the new NFT
    const approvalTransaction = await nftContract.setApprovalForAll(raffleContractAddress, true)
    await approvalTransaction.wait()

    const raflleContract = new ethers.Contract(raffleContractAddress, RaffleAbi, signer)

    const raffle = {
      nftContract: nftContractAddress,
      nftOwner: walletAddress,
      raffleID: 0,
      tokenID: latestTokenId,
      startTime: Math.round(new Date(data.startTime).getTime() / 1000), // must be timestamp in seconds
      endTime: Math.round(new Date(data.endTime).getTime() / 1000), // must be timestamp in seconds
      minimumDonationAmount: BigNumber.from(data.mimDonationAmount),
      topDonor: '0x0000000000000000000000000000000000000000',
      topDonatedAmount: BigNumber.from(0),
      tokenAllocation: BigNumber.from(data.tokenAllocation),
      buffer: BigNumber.from(data.tokenAllocation),
      cancelled: false,
    }

    // Create a new Raffle
    const raffleTransaction = await raflleContract.createRaffle(raffle)
    await raffleTransaction.wait()

    const raffleCount = await raflleContract.raffleCount()

    const tokenRewardContract = new ethers.Contract(tokenRewardContractAddress, ArtToken, signer)

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

    push('/admin/listRaffles')
  }
  return (
    <Layout>
      <Wrapper>
        <Form {...{ schema, uischema, data, setData }} />
        <Button onClick={handleSubmit}>Submit</Button>
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

export default CreateRaffle
