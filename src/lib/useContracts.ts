import { useState, useEffect, useContext, use } from 'react'
import { usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi'
import { watchContractEvent } from '@wagmi/core'
import { SeasonsAbi } from '@contracts'
import { assertFloat, assert, assertInt, WALLET_CHAIN_MISMATCH, WALLET_NO_FOUND, LayoutContext } from '@lib'
import { isEqual } from 'lodash'

interface useMintArtifactsProps {
  args: any[]
  functionName: string
  value?: bigint
  eventName: string
}

export const useContracts = ({ args, value, functionName, eventName }: useMintArtifactsProps) => {
  const [writeNow, setWriteNow] = useState(false)
  const [argsState, setArgsState] = useState<any[]>([])
  const { setVisibleModalWithAttrs, toggleModal } = useContext(LayoutContext)
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

      let error = e.message as string

      setErrorState(e.message as string)

      console.log('error usePrepareContractWrite::::', error)

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
          unwatch?.()
          resolve(log)
        },
      )
    })
  }

  useEffect(() => {
    setVisibleModalWithAttrs('errorModal', {
      errorState,
    })
  }, [errorState])

  useEffect(() => {
    if (status === 'success' && errorState !== null) {
      setErrorState(null)
    }
  }, [status])

  useEffect(() => {
    !isEqual(args, argsState) && setArgsState(args)
  }, [args])

  interface IOutcomeReturn {
    args: any
  }

  const execute = async (args?: any[]): Promise<{ error?: string; outcome?: IOutcomeReturn[] }> => {
    if (args) {
      setArgsState(args)
    }

    // setWriteNow(true)
    // write?.()
    await writeAsync?.()

    if (errorState) {
      return { error: errorState }
    }

    const eventResult = await contractEventListener()

    return { outcome: eventResult as IOutcomeReturn[] }
  }

  return { execute, isLoading }
}
