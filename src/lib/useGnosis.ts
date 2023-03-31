import { useEvmNativeBalance, useEvmTokenPrice } from '@moralisweb3/next'
import { EvmChain } from 'moralis/common-evm-utils'
import { ethers } from 'ethers'
import { useState } from 'react'
import { assert } from '@lib'

export const useGnosis = () => {
  const [_, updateSafeBalance] = useState()
  const safeAddress = assert(process.env.NEXT_PUBLIC_TREASURY_ADDRESS, 'NEXT_PUBLIC_TREASURY_ADDRESS')
  const chainId = assert(process.env.NEXT_PUBLIC_CHAIN_ID, 'NEXT_PUBLIC_CHAIN_ID')

  const evmChain = chainId === '1' ? EvmChain.ETHEREUM : EvmChain.GOERLI

  const addressOfUSDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

  const { data: safeBalance, error: safeBalanceError } = useEvmNativeBalance({
    address: safeAddress,
    chain: evmChain,
  })

  if (safeBalanceError) {
    console.error('safeBalanceError: ', safeBalanceError)
  }

  const {
    data: USDCTokenPriceData,
    error: USDCTokenPriceError,
    isFetching,
  } = useEvmTokenPrice({
    address: addressOfUSDC,
    chain: EvmChain.ETHEREUM, // use USDC mainnet contract for USD/ETH conversion
  })

  if (USDCTokenPriceError) {
    console.error('USDCTokenPriceError: ', USDCTokenPriceError)
  }

  const USDtoETHstr = USDCTokenPriceData?.nativePrice?.ether

  const USDtoETH =
    !isFetching && USDtoETHstr !== undefined ? parseFloat(ethers.utils.formatEther(parseInt(USDtoETHstr))) : undefined

  const safeBalanceETH =
    !isFetching && USDtoETHstr !== undefined
      ? parseFloat(safeBalance?.balance.ether ? safeBalance?.balance.ether : '').toFixed(2)
      : undefined

  const safeBalanceUSD =
    !isFetching && USDtoETHstr !== undefined && safeBalanceETH !== undefined && USDtoETH !== undefined
      ? (parseFloat(safeBalanceETH) / USDtoETH).toFixed(2)
      : undefined

  return { updateSafeBalance, safeBalanceETH, safeBalanceUSD, USDtoETH }
}
