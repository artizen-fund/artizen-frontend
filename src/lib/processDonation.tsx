import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client'
import { USDCAbi } from '@contracts'
import { CREATE_SWAP, CREATE_TOP_UP_WALLET, GET_TOP_UP_WALLET_VIA_TRANSFER_ID } from '@gql'
import { ICourierMessage, useCourier } from '@trycourier/react-provider'
import { ethers } from 'ethers'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAccount, useContractWrite, useSigner, useSwitchNetwork } from 'wagmi'
import { userMetadataVar } from './apollo'
import { assert } from './assert'
import { DonationContext } from './donationContext'
import { isProd } from './envHelpers'
import { getChainId } from './getChainId'
import { useBridge } from './useBridge'
import { useDonation } from './useDonation'
import { useLoggedInUser } from './useLoggedInUser'
import { USDC_UNIT } from './utilsCrypto'
import { v4 as uuidv4 } from 'uuid'
import { getConfirmDonationURL } from './confirmDonationUrl'
import { sleep } from './sleep'
import qs from 'qs'

interface IProcessDonationContext {
  donationMethod: DonationMethod
  setDonationMethod: (donationMethod: DonationMethod) => void
  amount: number
  setAmount: (amount: number) => void
  order: { id: string }
  setOrder: (o: { id: string }) => void
  cryptoStage: CryptoStage
  setCryptoStage: (cryptoStage: CryptoStage) => void
  error: Error
  setError: (error: Error) => void
  retry: () => void
}

type CryptoStage = 'swapping' | 'bridging' | 'building' | 'confirming' | 'complete'

type Error = 'Payment Failed' | 'Transaction Rejected' | 'Donation could not complete' | ''

const ProcessDonationContext = createContext<IProcessDonationContext>({})

export const ProcessDonationProvider = ({ children }: SimpleComponentProps) => {
  const { setDonationStage } = useContext(DonationContext)
  const [donationMethod, setDonationMethod] = useState<DonationMethod>('usd')
  const [amount, setAmount] = useState(10) // note: sort out integer or float
  const [order, setOrder] = useState<{ id: string }>({ id: '' })
  const [cryptoStage, setCryptoStage] = useState<CryptoStage>(donationMethod === 'ethereum' ? 'swapping' : 'building')
  const [error, setError] = useState<Error>('')

  const [loggedInUser] = useLoggedInUser()

  const metadata = useReactiveVar(userMetadataVar)

  const courier = useCourier()
  const [initDonation, buildingStatus, buildingMessage, confirmingStatus, confirmingMessage] = useDonation()
  const { address, isConnected } = useAccount()
  const { data: signer, refetch } = useSigner()
  const { switchNetworkAsync } = useSwitchNetwork()

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

  const [fetchTopUpWallet] = useLazyQuery(GET_TOP_UP_WALLET_VIA_TRANSFER_ID, {
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

  const handleTopUpFailed = async () => {
    setError('Payment Failed')
  }

  const handleTopUpComplete = async () => {
    setCryptoStage('building')
    fetchTopUpWallet()
  }

  const handleSwapComplete = async () => {
    setCryptoStage('bridging')
    // Change to Goerli for testing
    let refreshedSigner = signer
    if (!isProd()) {
      await switchNetworkAsync?.(5)
      refreshedSigner = await (await refetch()).data
    }
    const amountInUSDCDecimals = ethers.utils.parseUnits(amount.toString(), USDC_UNIT).toString()
    try {
      await bridge(address, refreshedSigner?.provider, metadata?.publicAddress!, amountInUSDCDecimals)
    } catch (error) {
      console.error('Bridging Error: ', error)
      setError('Transaction Rejected')
    }
  }

  const processTransaction = async () => {
    if (donationMethod === 'polygon' && !isTransferInitLoading) {
      await transferUSDC?.()
    } else {
      try {
        const baseURL0x = assert(process.env.NEXT_PUBLIC_0X_BASE_URL, 'NEXT_PUBLIC_0X_BASE_URL')
        const params = {
          buyToken: 'USDC',
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

        await createSwap({
          variables: {
            data: {
              state: 'INITIATED',
              amount: amountInUSDCDecimals,
              userId: loggedInUser?.id,
              txHash: swapTransaction?.hash,
            },
          },
        })
      } catch (error) {
        console.error('Swapping Error: ', error)
        setError('Transaction Rejected')
      }
    }
  }

  const createTopUpOrder = async (txHash: string) => {
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
        },
      },
    })

    setOrder({ id: orderId })
  }

  useEffect(() => {
    if (hasTrasnferedUSDC && transferUSDCdata?.hash) {
      createTopUpOrder(transferUSDCdata?.hash)
    }
  }, [hasTrasnferedUSDC])

  useEffect(() => {
    if (signer && donationMethod !== 'usd' && cryptoStage !== 'bridging' && isConnected) {
      processTransaction()
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [signer, isConnected])

  useEffect(() => {
    if (isTransferUSDCError) {
      console.error('USDC Transfer Error: ', transferUSDCError)
      setError('Transaction Rejected')
    }
  }, [isTransferUSDCError])

  useEffect(() => {
    courier.transport.intercept((message: ICourierMessage) => {
      switch (message.title) {
        case 'Payment is COMPLETE':
          handleTopUpComplete()
          break
        case 'Payment is FAILED':
          handleTopUpFailed()
          break
        case 'Swap is COMPLETE':
          handleSwapComplete()
          break
        default:
          console.error('Ignoring message from courier', message.title)
          break
      }
    })
  }, [])

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
      createTopUpOrder(fundsTransfered.exitHash)
    }
  }, [fundsTransfered])

  const handleBuildingDonationRetry = async () => {
    switch (donationMethod) {
      case 'ethereum':
        await handleSwapComplete()
        break
      case 'usd':
      case 'polygon':
      default:
        setDonationStage?.('payment')
        break
    }
  }

  const retry = async () => {
    setError('')
    switch (cryptoStage) {
      case 'swapping':
        setDonationStage?.('payment')
        break
      case 'bridging':
        await handleSwapComplete()
        break
      case 'building':
        await handleBuildingDonationRetry()
        break
      case 'confirming':
        await fetchTopUpWallet()
        break
      default:
        setDonationStage?.('payment')
        break
    }
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
        retry,
      }}
    >
      {children}
    </ProcessDonationContext.Provider>
  )
}

export const useProcessDonation = () => useContext(ProcessDonationContext)
