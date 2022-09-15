import { ContractInterface, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useMagic } from '@lib'

export const useReadContract = <T>(
  contractAddress: string,
  contractAbi: ContractInterface,
  methodName: string,
  attr: Array<any> = [],
  callOnInit = true,
) => {
  const { magic } = useMagic()

  const [value, setValue] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const callContract = async () => {
    if (!magic) return
    setLoading(true)

    const magicWeb3 = new ethers.providers.Web3Provider(magic.rpcProvider as any)

    const contract = new ethers.Contract(contractAddress, contractAbi, magicWeb3)

    try {
      const newValue = await contract[methodName](...attr)
      setValue(newValue)
    } catch (newError) {
      console.error('loading contract ', newError)
      setError(newError)
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
