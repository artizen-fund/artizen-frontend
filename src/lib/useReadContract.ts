import { ContractInterface, ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useSession } from './'

export const useReadContract = (
  contractAddress: string,
  contractAbi: ContractInterface,
  methodName: string,
  attr: Array<unknown> = [],
) => {
  const { magic } = useSession()
  if (magic === undefined) return []

  const [value, setValue] = useState<unknown>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const callContract = useCallback(async () => {
    setLoading(true)

    //todo: types are different but that is how docs shows to do
    //https://magic.link/docs/advanced/blockchains/ethereum/javascript#es-modules-type-script
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const magicWeb3 = new ethers.providers.Web3Provider(magic.rpcProvider)

    const contract = new ethers.Contract(contractAddress, contractAbi, magicWeb3)

    try {
      const value = await contract[methodName](...attr)

      setValue(value)
    } catch (error: unknown) {
      setError(error)
    }
    setLoading(false)
  }, [attr, contractAbi, contractAddress, methodName])

  useEffect(() => {
    callContract()
  }, [])

  return [value, loading, error]
}
