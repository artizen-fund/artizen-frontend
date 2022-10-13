import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client'
import { USDCAbi } from '@contracts'
import {
  CREATE_SWAP,
  CREATE_TOP_UP_WALLET,
  GET_TOP_UP_WALLET_VIA_ATTRIBUTE,
  UPDATE_SWAP_STATE,
  UPDATE_TOP_UP_WALLET_STATE,
} from '@gql'
import { ICourierMessage, useCourier } from '@trycourier/react-provider'
import { ethers } from 'ethers'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAccount, useConnect, useContractWrite, useDisconnect, useSigner } from 'wagmi'
import { userMetadataVar } from './apollo'
import { assert } from './assert'
import { DonationContext } from './donationContext'
import { isProd } from './envHelpers'
import { getChainId } from './getChainId'
import { useBridge } from './useBridge'
import { useDonation } from './useDonation'
import { formatUSDC, USDC_UNIT } from './utilsCrypto'
import { v4 as uuidv4 } from 'uuid'
import { getConfirmDonationURL } from './confirmDonationUrl'
import { sleep } from './sleep'
import qs from 'qs'
import { UserContext } from './userContext'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

interface IProcessDonationProvider {
  children: React.ReactNode
  chains: any
}

interface IProcessDonationContext {
  donationMethod?: DonationMethod
  setDonationMethod?: (donationMethod: DonationMethod) => void
  amount?: number
  setAmount?: (amount: number) => void
  order?: { id: string }
  setOrder?: (o: { id: string }) => void
  cryptoStage?: CryptoStage
  setCryptoStage?: (cryptoStage: CryptoStage) => void
  error?: Error
  setError?: (error: Error) => void
  restart?: () => void
  retry?: () => void
  connectWallet?: (wallet: string) => void
  isConnected?: boolean
  isError?: boolean
  setSwapId?: (swapId: string) => void
  swapId?: string
}

const walletConnectConnector = new WalletConnectConnector({
  options: {
    qrcode: true,
  },
})

type CryptoStage = 'swapping' | 'bridging' | 'building' | 'confirming' | 'complete'

type Error = 'Payment Failed' | 'Transaction Failed' | 'Donation could not complete' | 'Bridging Failed' | ''

const ProcessDonationContext = createContext<IProcessDonationContext>({})

export const ProcessDonationProvider = ({ children, chains }: IProcessDonationProvider) => {
  const { setDonationStage } = useContext(DonationContext)
  const [donationMethod, setDonationMethod] = useState<DonationMethod>('usd')
  const [amount, setAmount] = useState(10) // note: sort out integer or float
  const [order, setOrder] = useState<{ id: string }>({ id: '' })
  const [swapId, setSwapId] = useState('')
  const [cryptoStage, setCryptoStage] = useState<CryptoStage>('swapping')
  const [error, setError] = useState<Error>('')

  const { loggedInUser } = useContext(UserContext)

  const metadata = useReactiveVar(userMetadataVar)

  const courier = useCourier()
  const [initDonation, buildingStatus, buildingMessage, confirmingStatus, confirmingMessage] = useDonation()
  const { address, isConnected } = useAccount()
  const { connect, isError } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: signer, refetch } = useSigner()

  const { bridge, fundsTransfered } = useBridge()

  const usdcContractAddress = assert(
    process.env.NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_USDC_MATIC_CONTRACT_ADDRESS',
  )
  const chainId = getChainId(donationMethod)
  const amountInUSDCDecimals = ethers.utils.parseUnits(amount.toString(), USDC_UNIT).toString()

  const {
    data: transferUSDCdata,
    isSuccess: hasTrasnferedUSDC,
    writeAsync: transferUSDC,
    isLoading: isTransferInitLoading,
    isError: isTransferUSDCError,
    error: transferUSDCError,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: usdcContractAddress,
    contractInterface: USDCAbi,
    functionName: 'transfer',
    args: [metadata?.publicAddress, amountInUSDCDecimals],
    chainId,
  })

  const [createTopUpWallet] = useMutation(CREATE_TOP_UP_WALLET, {
    onError: error => {
      console.error('createTopUpWallet result    ', error)
    },
  })

  const [createSwap] = useMutation(CREATE_SWAP, {
    onError: error => {
      console.error('createSwap result    ', error)
    },
  })

  const [updateSwapState] = useMutation(UPDATE_SWAP_STATE, {
    onError: error => {
      console.error('updateSwapState result    ', error)
    },
  })

  const [updateTopUpWalletState] = useMutation(UPDATE_TOP_UP_WALLET_STATE, {
    onError: error => {
      console.error('updateTopUpWalletState result    ', error)
    },
  })

  const [fetchTopUpWallet] = useLazyQuery(GET_TOP_UP_WALLET_VIA_ATTRIBUTE, {
    variables: {
      attr: {
        orderId: { _eq: order.id },
      },
    },
    onCompleted: async (topUpWalletData: { TopUpWallet: string | any[] }) => {
      if (topUpWalletData.TopUpWallet.length > 0) {
        const { id, amount, fee } = topUpWalletData.TopUpWallet[0]
        setCryptoStage('confirming')
        try {
          await initDonation(amount, donationMethod, fee, id)
        } catch (error) {
          console.error('Donation Error: ', error)
          setError('Donation could not complete')
        }
      }
    },
  })

  const connectWallet = (wallet: string) => {
    if (wallet === 'metamask') {
      connect({
        connector: new MetaMaskConnector({ chains }),
        chainId,
      })
    } else {
      connect({
        connector: walletConnectConnector,
        chainId,
      })
    }
  }

  const handleTopUpFailed = async () => {
    setError('Payment Failed')
  }

  const handleTopUpComplete = async () => {
    setCryptoStage('building')
    fetchTopUpWallet()
  }

  const handleSwapComplete = async (publicAddress: string, amount: number) => {
    setCryptoStage('bridging')
    const amountInUSDCDecimals = ethers.utils.parseUnits(amount.toString(), USDC_UNIT).toString()
    try {
      const refreshedSigner = await (await refetch()).data
      await bridge(await refreshedSigner?.getAddress(), refreshedSigner?.provider, publicAddress, amountInUSDCDecimals)
    } catch (error) {
      console.error('Bridging Error: ', error)
      setError('Bridging Failed')
    }
  }

  const processTransaction = async () => {
    if (donationMethod === 'polygon' && !isTransferInitLoading) {
      await transferUSDC?.()
    } else {
      try {
        const baseURL0x = assert(process.env.NEXT_PUBLIC_0X_BASE_URL, 'NEXT_PUBLIC_0X_BASE_URL')
        const params = {
          buyToken: isProd() ? 'USDC' : assert(process.env.NEXT_PUBLIC_0X_BUY_TOKEN, 'NEXT_PUBLIC_0X_BUY_TOKEN'),
          sellToken: 'ETH',
          buyAmount: amountInUSDCDecimals,
          takerAddress: address,
        }

        const response = await fetch(`${baseURL0x}/swap/v1/quote?${qs.stringify(params)}`)
        const json = await response.json()
        json.from = address

        const tx = {
          from: address,
          to: json.to,
          value: json.value,
          data: json.data,
        }

        const swapTransaction = await signer?.sendTransaction(tx)

        const createSwapResult = await createSwap({
          variables: {
            data: {
              state: 'INITIATED',
              amount,
              userId: loggedInUser?.id,
              txHash: swapTransaction?.hash,
            },
          },
        })
        const {
          data: {
            insert_Swaps_one: { id },
          },
        } = createSwapResult

        setSwapId(id)
      } catch (error) {
        console.error('Swapping Error: ', error)
        setError('Transaction Failed')
      }
    }
  }

  const createTopUpOrder = async (txHash: string, swapId: string | null, amount: number) => {
    const orderId = uuidv4()
    await createTopUpWallet({
      variables: {
        data: {
          userId: loggedInUser?.id,
          amount,
          originFund: donationMethod,
          state: 'INITIATED',
          timestamp: new Date().getTime(),
          fee: 0,
          txHash,
          url: getConfirmDonationURL(),
          orderId,
          swapId,
        },
      },
    })

    setOrder({ id: orderId })
  }

  useEffect(() => {
    if (hasTrasnferedUSDC && transferUSDCdata?.hash) {
      createTopUpOrder(transferUSDCdata?.hash, null, amount)
    }
  }, [hasTrasnferedUSDC])

  useEffect(() => {
    if (signer && donationMethod !== 'usd' && cryptoStage !== 'bridging' && !swapId && isConnected) {
      processTransaction()
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [signer, isConnected])

  useEffect(() => {
    if (isTransferUSDCError) {
      console.error('USDC Transfer Error: ', transferUSDCError)
      setError('Transaction Failed')
    }
  }, [isTransferUSDCError])

  useEffect(() => {
    if (metadata?.publicAddress && amount && courier) {
      courier.transport.intercept((message: ICourierMessage) => {
        switch (message.title) {
          case 'Payment is COMPLETE':
            handleTopUpComplete()
            break
          case 'Payment is FAILED':
            handleTopUpFailed()
            break
          case 'Swap is COMPLETE':
            handleSwapComplete(metadata?.publicAddress!, amount)
            break
          default:
            console.error('Ignoring message from courier', message.title)
            break
        }
      })
    }
  }, [courier, metadata?.publicAddress, amount])

  const handleComplete = async () => {
    setCryptoStage('complete')
    await sleep(3000)
    setDonationStage?.('confirmation')
  }
  useEffect(() => {
    if (confirmingStatus === 'COMPLETE') {
      handleComplete()
    }
  }, [confirmingStatus])

  useEffect(() => {
    if (fundsTransfered && fundsTransfered.statusCode === 2) {
      createTopUpOrder(fundsTransfered.exitHash, swapId, formatUSDC(fundsTransfered.exitAmount))
    }
  }, [fundsTransfered])

  const handleBuildingDonationRestart = async () => {
    switch (donationMethod) {
      case 'ethereum':
        await handleSwapComplete(metadata?.publicAddress!, amount)
        break
      case 'usd':
      case 'polygon':
      default:
        setDonationStage?.('payment')
        break
    }
  }

  const restart = async () => {
    setError('')
    switch (cryptoStage) {
      case 'swapping':
        await processTransaction()
        break
      case 'bridging':
        await handleSwapComplete(metadata?.publicAddress!, amount)
        break
      case 'building':
        await handleBuildingDonationRestart()
        break
      case 'confirming':
        await fetchTopUpWallet()
        break
      default:
        setDonationStage?.('payment')
        break
    }
  }

  const handleBridgingRetry = async () => {
    await updateSwapState({
      variables: {
        swapId,
        state: 'SKIPPED',
      },
    })
    setSwapId('')
  }

  const handleBuildingRetry = async () => {
    await updateTopUpWalletState({
      variables: {
        orderId: order?.id,
        state: 'SKIPPED',
      },
    })
  }

  const retry = async () => {
    switch (cryptoStage) {
      case 'bridging':
        await handleBridgingRetry()
        break
      case 'building':
        await handleBuildingRetry()
        break
      default:
        break
    }
    disconnect()
    setDonationStage?.('setAmount')
    setError('')
  }

  return (
    <ProcessDonationContext.Provider
      value={{
        donationMethod,
        setDonationMethod,
        amount,
        setAmount,
        order,
        setOrder,
        cryptoStage,
        setCryptoStage,
        error,
        setError,
        restart,
        retry,
        connectWallet,
        isConnected,
        isError,
        setSwapId,
        swapId,
      }}
    >
      {children}
    </ProcessDonationContext.Provider>
  )
}

export const useProcessDonation = () => useContext(ProcessDonationContext)
