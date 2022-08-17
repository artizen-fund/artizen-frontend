import { useState } from 'react'
import { Hyphen } from '@biconomy/hyphen'
import { assert } from './assert'

export const useBridge = () => {
  const [fundsTransfered, setFundsTransfered] = useState<any>()

  const bridge = async (
    selectedAddress: string | undefined,
    provider: unknown,
    toAddress: string,
    amountInWei: string,
  ) => {
    const tokenAddress = assert(
      process.env.NEXT_PUBLIC_HYPHEN_USDC_TOKEN_ADDRESS,
      'NEXT_PUBLIC_HYPHEN_USDC_TOKEN_ADDRESS',
    )
    const contractAddress = assert(
      process.env.NEXT_PUBLIC_HYPHEN_CONTRACT_ADDRESS,
      'NEXT_PUBLIC_HYPHEN_CONTRACT_ADDRESS',
    )
    const hyphenEnvironment = assert(process.env.NEXT_PUBLIC_HYPHEN_ENV, 'NEXT_PUBLIC_HYPHEN_ENV')

    const fromChainId = assert(process.env.NEXT_PUBLIC_HYPHEN_FROM_CHAIN_ID, 'NEXT_PUBLIC_HYPHEN_FROM_CHAIN_ID')
    const toChainId = assert(process.env.NEXT_PUBLIC_HYPHEN_TO_CHAIN_ID, 'NEXT_PUBLIC_HYPHEN_TO_CHAIN_ID')

    const hyphen = new Hyphen(provider, {
      debug: true, // If 'true', it prints debug logs on console window
      environment: hyphenEnvironment, // It can be "test" or "prod"
      onFundsTransfered: data => {
        setFundsTransfered(data)
      },
    })

    await hyphen.init()

    const approveTx = await hyphen.tokens.approveERC20(
      tokenAddress,
      contractAddress,
      amountInWei,
      selectedAddress,
      false,
      false,
    )

    // Wait for 1 block confirmation
    await approveTx.wait(1)

    const depositTx = await hyphen.depositManager.deposit({
      sender: selectedAddress,
      receiver: toAddress,
      tokenAddress,
      depositContractAddress: contractAddress,
      amount: amountInWei, //Amount to be transferred. Denoted in smallest unit eg in wei",
      fromChainId, // chainId of fromChain - Ethereum
      toChainId, // chainId of toChain - Polygon
      useBiconomy: false, // OPTIONAL boolean flag specifying whether to use Biconomy for gas less transaction or not
      tag: 'Artizen',
    })

    // Wait for 1 block confirmation
    await depositTx.wait(1)
  }

  return { bridge, fundsTransfered }
}
