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
  const { data: USDCTokenPriceData, error: USDCTokenPriceError } = useEvmTokenPrice({
    address: addressOfUSDC,
    chain: EvmChain.ETHEREUM,
  })

  if (safeBalanceError) {
    console.log('safeBalanceError', safeBalanceError)
  }

  console.log(`safeBalance: ${safeBalance}`)
  console.log(`USDCTokenPriceData: ${USDCTokenPriceData}`)

  const USDtoETH = parseFloat(
    ethers.utils.formatEther(
      parseInt(USDCTokenPriceData?.nativePrice?.ether ? USDCTokenPriceData?.nativePrice?.ether : ''),
    ),
  )

  const safeBalanceETH = parseFloat(safeBalance?.balance.ether ? safeBalance?.balance.ether : '').toFixed(2)
  const safeBalanceUSD = (parseFloat(safeBalanceETH) / USDtoETH).toFixed(2)
  const safeBalanceStr = `${safeBalanceETH} ETH | $ ${safeBalanceUSD}`

  return { safeBalanceStr, safeBalanceETH, safeBalanceUSD, USDtoETH }
}
