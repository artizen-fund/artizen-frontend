import Moralis from 'moralis'
import { formatUnits } from 'viem'

const seasonsContractAddress = !!process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS
  ? process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS
  : ''

async function getOECcount(address: string, tokenId: string): Promise<number> {
  try {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: '0x5',
      format: 'decimal',
      tokenAddresses: [seasonsContractAddress],
      mediaItems: false,
      address: address,
    })

    if (!!response.raw && !!response.raw.result) {
      const count = response.raw.result.find(element => {
        return element.token_id === tokenId
      })?.amount

      return parseInt(!!count ? count : '0')
    }
  } catch (e) {
    console.error(e)
  }

  return -1
}

async function getWalletBalance(address: string): Promise<bigint> {
  try {
    const response = await Moralis.EvmApi.balance.getNativeBalance({
      chain: '0x5',
      address: address,
    })
    return formatUnits(response.toJSON().balance, 9)
  } catch (e) {
    console.error(e)
  }

  return formatUnits(-1)
}

export { getOECcount, getWalletBalance, seasonsContractAddress }
