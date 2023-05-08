import { usePrepareContractWrite, useContractWrite, useBalance } from 'wagmi'
import { SeasonsAbi } from '@contracts'
import { ethers } from 'ethers'
import { assertFloat, assert, assertInt } from '@lib'

interface useMintArtifactsProps {
  tokenId: string
  artifactQuantity: number
}

export const useMintArtifacts = ({ tokenId, artifactQuantity }: useMintArtifactsProps) => {
  const SEASON_CONTRACT = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )

  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')

  const BASE_ARTIFACT_PRICE = assertFloat(
    process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
    'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  )

  const { config, error } = usePrepareContractWrite({
    address: SEASON_CONTRACT as `0x${string}`,
    abi: SeasonsAbi,
    functionName: 'mintArtifact',
    args: [[tokenId], [artifactQuantity]],
    chainId,
    overrides: {
      value: ethers.utils.parseEther((BASE_ARTIFACT_PRICE * artifactQuantity).toString()),
    },
    onError: e => {
      console.log('error prepering contract', e)
    },
  })

  const { writeAsync, isLoading, isSuccess, isError } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled', { data, error })

      if (error) {
        console.log('error useContractWrite', error)
      }
    },
  })

  return { error: isError || error, isLoading, isSuccess, writeAsync }
}
