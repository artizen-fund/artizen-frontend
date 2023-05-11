import { useEvmNativeBalance, useEvmTokenPrice } from '@moralisweb3/next'
import { EvmChain } from 'moralis/common-evm-utils'
import { parseEther, parseGwei } from 'viem'
import { formatEther } from 'viem'
import { useState } from 'react'
import { assert, assertFloat } from '@lib'

export const useGnosis = () => {
  const [_, updateSafeBalance] = useState()
  const safeAddress = assert(process.env.NEXT_PUBLIC_TREASURY_ADDRESS, 'NEXT_PUBLIC_TREASURY_ADDRESS')
  const seasonsContractAddress = assert(
    process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS',
  )
  const chainId = assert(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')
  const addressOfUSDC = assert(process.env.NEXT_PUBLIC_USDC_MAINNET_ADDRESS, 'NEXT_PUBLIC_USDC_MAINNET_ADDRESS')
  const ratioOfSeasonsContractValueForTreasury = assertFloat(
    process.env.NEXT_PUBLIC_SEASONS_VALUE_RATIO_FOR_TREASURY,
    'NEXT_PUBLIC_SEASONS_VALUE_RATIO_FOR_TREASURY',
  )

  const evmChain = chainId === '1' ? '0x1' : '0x5'

  const { data: safeBalance, error: safeBalanceError } = useEvmNativeBalance({
    address: safeAddress,
    chain: evmChain,
  })

  if (safeBalanceError) {
    console.error('safeBalanceError: ', safeBalanceError)
  }

  const { data: seasonsContractBalance, error: seasonsContractBalanceError } = useEvmNativeBalance({
    address: seasonsContractAddress,
    chain: evmChain,
  })

  if (seasonsContractBalanceError) {
    console.error('seasonsContractError: ', seasonsContractBalanceError)
  }

  const {
    data: USDCTokenPriceData,
    error: USDCTokenPriceError,
    isFetching,
  } = useEvmTokenPrice({
    address: addressOfUSDC,
    chain: '0x1', // use USDC mainnet contract for USD/ETH conversion
  })

  if (USDCTokenPriceError) {
    console.error('USDCTokenPriceError: ', USDCTokenPriceError)
  }

  const USDtoETHstr = USDCTokenPriceData?.nativePrice?.ether

  const USDtoETH = !isFetching && USDtoETHstr !== undefined ? parseFloat(formatEther(BigInt(USDtoETHstr))) : undefined

  const safeBalanceETH =
    !isFetching && USDtoETHstr !== undefined
      ? parseFloat(safeBalance?.balance.ether ? safeBalance?.balance.ether : '').toFixed(2)
      : undefined

  const safeBalanceUSD =
    !isFetching && USDtoETHstr !== undefined && safeBalanceETH !== undefined && USDtoETH !== undefined
      ? (parseFloat(safeBalanceETH) / USDtoETH).toFixed(2)
      : undefined

  const seasonsContractBalanceETH =
    !isFetching && USDtoETHstr !== undefined
      ? parseFloat(seasonsContractBalance?.balance.ether ? seasonsContractBalance?.balance.ether : '').toFixed(2)
      : undefined

  const seasonsContractBalanceUSD =
    !isFetching && USDtoETHstr !== undefined && seasonsContractBalanceETH !== undefined && USDtoETH !== undefined
      ? (parseFloat(seasonsContractBalanceETH) / USDtoETH).toFixed(2)
      : undefined

  const artizenPrizeAmountETH =
    !isFetching && safeBalanceETH !== undefined && seasonsContractBalanceETH !== undefined
      ? (
          parseFloat(safeBalanceETH) +
          ratioOfSeasonsContractValueForTreasury * parseFloat(seasonsContractBalanceETH)
        ).toFixed(2)
      : undefined

  const artizenPrizeAmountUSD =
    !isFetching && safeBalanceUSD !== undefined && seasonsContractBalanceUSD !== undefined
      ? (
          parseFloat(safeBalanceUSD) +
          ratioOfSeasonsContractValueForTreasury * parseFloat(seasonsContractBalanceUSD)
        ).toFixed(2)
      : undefined

  return { updateSafeBalance, safeBalanceETH, safeBalanceUSD, USDtoETH, artizenPrizeAmountETH, artizenPrizeAmountUSD }
}
