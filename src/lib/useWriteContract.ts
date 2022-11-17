import { ContractInterface, ethers } from 'ethers'

export const useWriteContract = () => {
  const callContract = async (
    contractAddress: string,
    contractAbi: ContractInterface,
    methodName: string,
    attr: Array<unknown> = [],
  ) => {
    // const signer = magicWeb3.getSigner()
    // const contract = new ethers.Contract(contractAddress, contractAbi, signer)

    return new Promise(async (resolve, reject) => {
      try {
        // const transaction = await contract[methodName](...attr)
        // await transaction.wait()
        // resolve(transaction)
      } catch (error: unknown) {
        reject(error)
      }
    })
  }

  return [callContract] as const
}
