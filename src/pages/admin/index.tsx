import { Button, Form } from '@components'
import { ArtizenERC1155 } from '@contracts'
import { schema, uischema, initialState, FormState } from '@forms/admin'
import { assert } from '@lib'
import { BigNumber, ethers } from 'ethers'
import { useState } from 'react'
import raffleAbi from 'src/contracts/RaffleAbi'
import styled from 'styled-components'

const Admin = () => {
  const [data, setData] = useState<FormState>(initialState)

  const handleSubmit = async () => {
    const rpcUrl = assert(process.env.NEXT_PUBLIC_RPC_URL, 'NEXT_PUBLIC_RPC_URL')
    const privateKey = assert(process.env.NEXT_PUBLIC_TEST_WALLET_PK, 'NEXT_PUBLIC_TEST_WALLET_PK')
    const nftContractAddress = assert(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, 'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS')
    const raffleContractAddress = assert(
      process.env.NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS,
      'NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS',
    )

    const signer = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpcUrl))
    const walletAddress = await signer.getAddress()

    const nftContract = new ethers.Contract(nftContractAddress, ArtizenERC1155, signer)

    await nftContract.mint(walletAddress, 4, '0x', data.tokenURI)

    await nftContract.setApprovalForAll(raffleContractAddress, true)

    const raflleContract = new ethers.Contract(raffleContractAddress, raffleAbi, signer)

    const raffle = {
      nftContract: nftContractAddress,
      nftOwner: walletAddress,
      raffleID: 0,
      tokenID: 1,
      startTime: Math.round(new Date(data.startTime).getTime() / 1000),
      endTime: Math.round(new Date(data.endTime).getTime() / 1000),
      minimumDonationAmount: BigNumber.from(data.mimDonationAmount),
      topDonor: '0x0000000000000000000000000000000000000000',
      topDonatedAmount: BigNumber.from(0),
      tokenAllocation: BigNumber.from(data.tokenAllocation),
      buffer: BigNumber.from(data.tokenAllocation),
      cancelled: false,
    }

    await raflleContract.createRaffle(raffle)
  }
  return (
    <Wrapper>
      <Form {...{ schema, uischema, data, setData }} />
      <Button onClick={handleSubmit}>Submit</Button>
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

export default Admin
