import { SeasonsAbi } from '@contracts'
import { useContract, useSigner } from 'wagmi'
import { assert } from '@lib'

export const useSmartContracts = () => {
  const { data: signer } = useSigner()

  const seasonsContractAddress: string = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )

  const seasonsContract = useContract({
    address: seasonsContractAddress,
    abi: SeasonsAbi,
    signerOrProvider: signer,
  })

  return { seasonsContract }
}
