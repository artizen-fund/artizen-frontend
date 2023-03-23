import { useContext } from 'react'
import { ethers } from 'ethers'
import { useSmartContracts, LayoutContext } from '@lib'

export const useDonate = () => {
  // const { grantsContract } = useSmartContracts()
  // const { toggleModal } = useContext(LayoutContext)
  const donate = async (grantId: number, amount: string) => {
    // const grantTransaction = await grantsContract?.donate(grantId, ethers.utils.parseEther(amount), {
    //   value: ethers.utils.parseEther(amount),
    // })
    // toggleModal('processTransaction')
    // const returnTx = await grantTransaction.wait()
    // return returnTx
  }

  return { donate }
}
