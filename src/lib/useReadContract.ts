import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { magicWeb3 } from './magicLink'

export const useReadContract = (
  contractAddress: string,
  contractAbi: string,
  methodName: string,
  attr: Array<unknown> = [],
) => {
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const callContract = useCallback(async () => {
    setLoading(true)

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
