import { GrantsAbi, ArtizenArtifactsAbi } from '@contracts'
import { useContract, useSigner } from 'wagmi'
import { assert } from '@lib'

export const useSmartContracts = () => {
  const { data: signer } = useSigner()

  // const nftContractAddress = assert(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, 'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS')
  const grantContractAddress: string = assert(
    process.env.NEXT_PUBLIC_GRANTS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_GRANTS_CONTRACT_ADDRESS',
  )
  const nftContractAddress: string = assert(
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS',
  )

  const grantsContract = useContract({
    address: grantContractAddress,
    abi: GrantsAbi,
    signerOrProvider: signer,
  })

  const nftContract = useContract({
    address: nftContractAddress,
    abi: ArtizenArtifactsAbi,
    signerOrProvider: signer,
  })

  return { grantsContract, nftContract, grantContractAddress, nftContractAddress }
}
