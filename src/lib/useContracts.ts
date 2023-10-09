import { useState, useEffect, useContext, use } from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { watchContractEvent } from '@wagmi/core'
import { SeasonsAbi } from '@contracts'
import { assert, assertInt, WALLET_CHAIN_MISMATCH, WALLET_NO_FOUND, LayoutContext } from '@lib'
import { isEqual } from 'lodash'
import { usePrivy } from '@privy-io/react-auth'

interface useContractsProps {
  args: any[]
  functionName: string
  value?: any
  eventName: string
  warming?: boolean
}

export const useContracts = ({ args, value, functionName, eventName, warming }: useContractsProps) => {
  const [processing, setProcessing] = useState(false)
  const [argsState, setArgsState] = useState<any[]>([])
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  const [errorState, setErrorState] = useState<string | null>(null)
  const SEASON_CONTRACT = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )
  const { login, authenticated, ready } = usePrivy()
  const chainId = assertInt(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
  const chainName = chainId === 1 ? 'Etherium' : 'Goerli Testnet'
  const ERRORNETWORK = `You have logged onto wrong network, please logout and login again using: ${chainName}`
  const NON_ENOUGH_FUNDS = `You do not have enough funds in your wallet to mint this open edition`

  const { config, status } = usePrepareContractWrite({
    address: SEASON_CONTRACT as `0x${string}`,
    abi: SeasonsAbi,
    functionName,
    args: argsState,
    chainId,
    value,
    onError: e => {
      let error = e.message as string

      console.log('error usePrepareContractWrite here', error)

      // setErrorState(e.message as string)

      if (error.includes(WALLET_CHAIN_MISMATCH)) {
        error = ERRORNETWORK
        setErrorState(error)
      }
      if (error.includes(WALLET_NO_FOUND)) {
        error = NON_ENOUGH_FUNDS
        setErrorState(error)
      }
    },
  })

  const {
    isLoading,
    writeAsync,
    write,
    status: writeContractStatus,
  } = useContractWrite({
    ...config,
    onSettled(data, error) {
      if (error) {
        setErrorState(error.message as string)
        return
      }

      setErrorState(null)
    },

    onError(error) {
      setErrorState(error.message as string)
    },
  })

  console.log('status   ', status)
  console.log('writeContractStatus  ', writeContractStatus)

  const contractEventListener = async () => {
    return new Promise(resolve => {
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
    console.log('errorState   ', errorState)
    const errorStateChain =
      errorState === 'You have logged onto the wrong network, please logout and login again using: Goerli Testnet'
    console.log('warming   ', warming)
    console.log('errorStateChain', errorStateChain)
    const showError = errorState === ERRORNETWORK || (errorState !== null && !warming)

    showError &&
      setVisibleModalWithAttrs('errorModal', {
        error: errorState,
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
    if (ready && !authenticated) {
      login()
      return { outcome: {} as IOutcomeReturn[], error: 'login' }
    }
    if (args) {
      setArgsState(args)
    }

    setProcessing(true)

    const writeText = await writeAsync?.()

    if (errorState) {
      return { error: errorState }
    }

    const eventResult = await contractEventListener()

    setProcessing(false)

    return { outcome: eventResult as IOutcomeReturn[] }
  }

  return { status: writeContractStatus, execute, isLoading, write, errorState, contractEventListener, processing }
}
