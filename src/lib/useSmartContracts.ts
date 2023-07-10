import { SeasonsAbi } from '@contracts'
import { useWalletClient } from 'wagmi'
// import { getContract, getWalletClient } from 'wagmi/actions'
import { getContract } from '@wagmi/core'
import { assert } from '@lib'

export const useSmartContracts = () => {
  // const { data: signer } = useSigner()
  const { data: walletClient } = useWalletClient()

  console.log('walletClient   ', walletClient)

  const seasonsContractAddress: string = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )

  const seasonsContract = getContract({
    address: `0x${seasonsContractAddress}`,
    abi: SeasonsAbi,
    // walletClient,
  })

  console.log('seasonsContract here  ', seasonsContract)

  return { seasonsContract }
}
