import { useEvmNativeBalance, useEvmTokenPrice } from '@moralisweb3/next'
import { EvmChain } from 'moralis/common-evm-utils'
import { ethers } from 'ethers'

export const useGnosis = () => {
  const safeAddress = '0x71717DAAFF29E17641F64392f24fa21022e1C332'
  const addressOfUSDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

  const { data: safeBalance, error: safeBalanceError } = useEvmNativeBalance({
    address: safeAddress,
    chain: EvmChain.ETHEREUM,
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
    chain: EvmChain.ETHEREUM,
  })

  if (USDCTokenPriceError) {
    console.error('USDCTokenPriceError: ', USDCTokenPriceError)
  }

  const USDtoETHstr = USDCTokenPriceData?.nativePrice?.ether

  let safeBalanceStr, safeBalanceETH, safeBalanceUSD, USDtoETH
  if (!isFetching && USDtoETHstr !== undefined) {
    USDtoETH = parseFloat(ethers.utils.formatEther(parseInt(USDtoETHstr)))
    safeBalanceETH = parseFloat(safeBalance?.balance.ether ? safeBalance?.balance.ether : '').toFixed(2)
    safeBalanceUSD = (parseFloat(safeBalanceETH) / USDtoETH).toFixed(2)
    safeBalanceStr = `${safeBalanceETH} ETH | $ ${safeBalanceUSD}`
  }

  return { safeBalanceStr, safeBalanceETH, safeBalanceUSD, USDtoETH }
}
