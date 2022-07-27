import { Button, Form, Layout } from '@components'
import { ArtizenERC1155 } from '@contracts'
import { schema, uischema, initialState, FormState } from '@forms/admin'
import { assert, useMagic } from '@lib'
import { BigNumber, ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useState } from 'react'
import artTokenAbi from 'src/contracts/ArtToken'
import raffleAbi from 'src/contracts/RaffleAbi'
import styled from 'styled-components'

const Admin = () => {
  const [data, setData] = useState<FormState>(initialState)
  const { magic } = useMagic()
  const { push } = useRouter()

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

    //todo: types are different but that is how docs shows to do
    //https://magic.link/docs/advanced/blockchains/ethereum/javascript#es-modules-type-script
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const magicWeb3Provider = new ethers.providers.Web3Provider(magic.rpcProvider)

    const signer = magicWeb3Provider.getSigner()
    const walletAddress = await signer.getAddress()

    const nftContract = new ethers.Contract(nftContractAddress, ArtizenERC1155, signer)

    const mintTransaction = await nftContract.mint(walletAddress, 4, '0x', data.tokenURI)

    await mintTransaction.wait()

    const latestTokenId = await nftContract.tokenIds()

    const approvalTransaction = await nftContract.setApprovalForAll(raffleContractAddress, true)

    await approvalTransaction.wait()

    const raflleContract = new ethers.Contract(raffleContractAddress, raffleAbi, signer)

    const raffle = {
      nftContract: nftContractAddress,
      nftOwner: walletAddress,
      raffleID: 0,
      tokenID: latestTokenId,
      startTime: Math.round(new Date(data.startTime).getTime() / 1000),
      endTime: Math.round(new Date(data.endTime).getTime() / 1000),
      minimumDonationAmount: BigNumber.from(data.mimDonationAmount),
      topDonor: '0x0000000000000000000000000000000000000000',
      topDonatedAmount: BigNumber.from(0),
      tokenAllocation: BigNumber.from(data.tokenAllocation),
      buffer: BigNumber.from(data.tokenAllocation),
      cancelled: false,
    }

    const raffleTransaction = await raflleContract.createRaffle(raffle)

    await raffleTransaction.wait()

    const raffleCount = await raflleContract.raffleCount()

    const tokenRewardContract = new ethers.Contract(tokenRewardContractAddress, artTokenAbi, signer)

    const tokenRewardApproveTransaction = await tokenRewardContract.approve(
      raffleContractAddress,
      ethers.constants.MaxUint256,
    )

    await tokenRewardApproveTransaction.wait()

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

export default Admin
