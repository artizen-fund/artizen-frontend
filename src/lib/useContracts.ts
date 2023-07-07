import { useState, useEffect } from 'react'
import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi'
import { watchContractEvent } from '@wagmi/core'
import { SeasonsAbi } from '@contracts'
import { assertFloat, assert, assertInt, WALLET_CHAIN_MISMATCH, WALLET_NO_FOUND } from '@lib'

interface useMintArtifactsProps {
  args: any[]
  functionName: string
  value?: bigint
  eventName: string
}

export const useContracts = ({ args, value, functionName, eventName }: useMintArtifactsProps) => {
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

  const { config, status } = usePrepareContractWrite({
    address: SEASON_CONTRACT as `0x${string}`,
    abi: SeasonsAbi,
    functionName,
    args,
    chainId,
    onError: e => {
      console.log('error usePrepareContractWrite here', e.message)

      setErrorState(e.message as string)

      //   if (error.includes(WALLET_CHAIN_MISMATCH)) {
      //     const chainName = chainId === 1 ? 'Etherium' : 'Goerli Testnet'
      //     error = `You're logged on wrong change, please logout and login again using: ${chainName}`
      //     setErrorState(error)
      //   }
      //   if (error.includes(WALLET_NO_FOUND)) {
      //     error = `You do not have enough funds in your wallet to mint this open edition`
      //     setErrorState(error)
      //   }
    },
  })

  const { writeAsync, isLoading, isSuccess, isError } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled', { data, error })

      if (error) {
        console.log('error useContractWrite', error)
        setErrorState(error.message as string)
        return
      }

      setErrorState(null)
    },
  })

  const contractEventListener = async () => {
    return new Promise((resolve, reject) => {
      const unwatch = watchContractEvent(
        {
          address: SEASON_CONTRACT as `0x${string}`,
          abi: SeasonsAbi,
          eventName,
        },
        (log: any) => {
          console.log('log from watchContractEvent   ', log)
          unwatch?.()
          resolve(log)
        },
      )
    })
  }

  useEffect(() => {
    console.log('useEffect status', status)

    if (status === 'success' && errorState !== null) {
      setErrorState(null)
    }
  }, [status])

  interface IOutcomeReturn {
    args: any
  }

  const execute = async (): Promise<{ error?: string; outcome?: IOutcomeReturn[] }> => {
    console.log('execute starts')
    const result = await writeAsync?.()

    if (errorState) {
      console.log('execute error', errorState)
      return { error: errorState }
    }

    console.log('result', result)

    const eventResult = await contractEventListener()

    console.log('eventResult', eventResult)

    return { outcome: eventResult as IOutcomeReturn[] }
  }

  return { execute }
}
