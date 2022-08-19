import { ContractInterface, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useMagic } from '@lib'

export const useReadContract = (
  contractAddress: string,
  contractAbi: ContractInterface,
  methodName: string,
  attr: Array<any> = [],
  callOnInit = true,
): any => {
  const { magic } = useMagic()
  if (magic === undefined) return []

  const [value, setValue] = useState<unknown>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const callContract = async () => {
    setLoading(true)

    const magicWeb3 = new ethers.providers.Web3Provider(magic.rpcProvider as any)

    const contract = new ethers.Contract(contractAddress, contractAbi, magicWeb3)

    try {
      const value = await contract[methodName](...attr)
      setValue(value)
    } catch (error: unknown) {
      setError(error)
    }
    setLoading(false)
  }

  const refetch = async () => {
    await callContract()
  }

  useEffect(() => {
    if (callOnInit) {
      callContract()
    }
  }, [])

  return { value, loading, error, refetch }
}
