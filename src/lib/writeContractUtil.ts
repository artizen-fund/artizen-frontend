// import { prepareWriteContract, writeContract } from '@wagmi/core'
import { assert } from '@lib'
import { SeasonsAbi } from '@contracts'

const SEASON_CONTRACT = assert(process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS, 'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS')

export const writeContractUtil = async ({ args, functionName }: { args: any[]; functionName: string }) => {
  // const config = await prepareWriteContract({
  //   address: SEASON_CONTRACT as `0x${string}`,
  //   abi: SeasonsAbi,
  //   functionName,
  //   args,
  // })

  // const { hash } = await writeContract(config)

  return {
    error: null,
    hash: null,
  }
}
