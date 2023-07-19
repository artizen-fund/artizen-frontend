import { useState, useEffect, use } from 'react'
import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi'
import { watchContractEvent } from '@wagmi/core'
import { SeasonsAbi } from '@contracts'
import { assertFloat, assert, assertInt, WALLET_CHAIN_MISMATCH, WALLET_NO_FOUND } from '@lib'
import { isEqual } from 'lodash'

interface useMintArtifactsProps {
  args: any[]
  functionName: string
  value?: bigint
  eventName: string
}

export const useContracts = ({ args, value, functionName, eventName }: useMintArtifactsProps) => {
  console.log('useContracts initial args', args)

  const [writeNow, setWriteNow] = useState(false)
  const [argsState, setArgsState] = useState<any[]>([])
  const [errorState, setErrorState] = useState<string | null>(null)
  const SEASON_CONTRACT = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )

  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')

  const { config, status } = usePrepareContractWrite({
    address: SEASON_CONTRACT as `0x${string}`,
    abi: SeasonsAbi,
    functionName,
    args: argsState,
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

  const { isLoading, writeAsync } = useContractWrite({
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

    onError(error) {
      console.log('error useContractWrite', error)
      setErrorState(error.message as string)
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

  useEffect(() => {
    console.log('useEffect args', args)

    !isEqual(args, argsState) && setArgsState(args)
  }, [args])

  interface IOutcomeReturn {
    args: any
  }

  // useEffect(() => {
  //   console.log('useEffect write', args)
  //   console.log('useEffect isLoading', isLoading)
  //   console.log('useEffect writeNow', writeNow)
  //   console.log('useEffect write', write)
  //   if (writeNow) {
  //     setWriteNow(false)
  //     write?.()
  //   }
  // }, [isLoading, write, writeNow])

  const execute = async (args?: any[]): Promise<{ error?: string; outcome?: IOutcomeReturn[] }> => {
    console.log('execute starts', args)
    if (args) {
      setArgsState(args)
    }

    // setWriteNow(true)
    // write?.()
    await writeAsync?.()

    if (errorState) {
      console.log('execute error', errorState)
      return { error: errorState }
    }

    const eventResult = await contractEventListener()

    console.log('eventResult', eventResult)

    return { outcome: eventResult as IOutcomeReturn[] }
  }

  return { execute, isLoading }
}
