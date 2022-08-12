import { ContractInterface, ethers } from 'ethers'
import { useMagic } from '@lib'

export const useWriteContract = () => {
  const { magic } = useMagic()
  if (magic === undefined) return []

  const callContract = async (
    contractAddress: string,
    contractAbi: ContractInterface,
    methodName: string,
    attr: Array<unknown> = [],
  ) => {
    //todo: types are different but that is how docs shows to do
    //https://magic.link/docs/advanced/blockchains/ethereum/javascript#es-modules-type-script
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const magicWeb3 = new ethers.providers.Web3Provider(magic.rpcProvider)

    const signer = magicWeb3.getSigner()

    const contract = new ethers.Contract(contractAddress, contractAbi, signer)

    return new Promise(async (resolve, reject) => {
      try {
        const transaction = await contract[methodName](...attr)

        await transaction.wait()

        resolve(transaction)
      } catch (error: unknown) {
        reject(error)
      }
    })
  }

  return [callContract] as const
}
