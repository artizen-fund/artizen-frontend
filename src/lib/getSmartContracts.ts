import { SeasonsAbi } from '@contracts'
import { getContract, getWalletClient } from '@wagmi/core'
import { assert } from '@lib'

export const getSmartContracts = async () => {
  // const { data: signer } = useSigner()
  const walletClient = await getWalletClient()

  const seasonsContractAddress: string = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )

  //   const seasonsContract = getContract({
  //     address: `0x${seasonsContractAddress}`,
  //     abi: SeasonsAbi,
  //     walletClient,
  //   })

  let seasonsContract = null

  if (walletClient) {
    seasonsContract = getContract({
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      abi: SeasonsAbi,
      walletClient,
    })
  }

  return { seasonsContract }
}
