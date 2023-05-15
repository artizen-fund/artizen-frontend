import { useState } from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { SeasonsAbi } from '@contracts'
import { ethers } from 'ethers'
import { assertFloat, assert, assertInt, WALLET_CHAIN_MISMATCH, WALLET_NO_FOUND } from '@lib'

interface useMintArtifactsProps {
  tokenId: string
  artifactQuantity: number
}

export const useMintArtifacts = ({ tokenId, artifactQuantity }: useMintArtifactsProps) => {
  const [errorState, setErrorState] = useState<string | null>(null)
  const SEASON_CONTRACT = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )

  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')

  const BASE_ARTIFACT_PRICE = assertFloat(
    process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
    'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  )

  const { config } = usePrepareContractWrite({
    address: SEASON_CONTRACT as `0x${string}`,
    abi: SeasonsAbi,
    functionName: 'mintArtifact',
    args: [[tokenId], [artifactQuantity]],
    chainId,
    overrides: {
      value: ethers.utils.parseEther((BASE_ARTIFACT_PRICE * artifactQuantity).toString()),
    },
    onError: e => {
      console.log('error usePrepareContractWrite here', e.message)

      let error = e.message

      if (error.includes(WALLET_CHAIN_MISMATCH)) {
        const chainName = chainId === 1 ? 'Etherium' : 'Goerli Testnet'
        error = `You're logged on wrong change, please logout and login again using: ${chainName}`
        setErrorState(error)
      }
      if (error.includes(WALLET_NO_FOUND)) {
        error = `You do not have enough funds in your wallet to mint this open edition`
        setErrorState(error)
      }
    },
  })

  const { writeAsync, isLoading, isSuccess } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled', { data, error })

      if (error) {
        console.log('error useContractWrite', error)
        setErrorState(error.message)
      }
    },
  })

  return { error: errorState, isLoading, isSuccess, writeAsync }
}
