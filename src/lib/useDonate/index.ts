import { ethers } from 'ethers'
import { useSmartContracts } from '@lib'

export const useDonate = () => {
  const { grantsContract } = useSmartContracts()
  const donate = async (grantId: number, amount: string) => {
    const grantTransaction = await grantsContract?.donate(grantId, ethers.utils.parseEther(amount), {
      value: ethers.utils.parseEther(amount),
    })
    const returnTx = await grantTransaction.wait()
    return returnTx
  }

  return { donate }
}
