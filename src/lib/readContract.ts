import { SeasonsAbi } from '@contracts'
import { assert, assertInt } from '@lib'
// import { readContract as readContractM } from '@wagmi/core'

export const readContract = async (functionName: string): Promise<{ data: any }> => {
  const SEASON_CONTRACT = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )

  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')

  // const data = await readContractM({
  //   address: SEASON_CONTRACT as `0x${string}`,
  //   abi: SeasonsAbi,
  //   functionName,
  //   chainId,
  // })

  return { data: null }
}
