import { ContractInterface } from 'ethers'
import { useEffect, useState } from 'react'

export const useReadContract = <T>(
  contractAddress: string,
  //TODO: Stop using ethers and replace it for view, fix this type
  contractAbi: ContractInterface,
  methodName: string,
  attr: Array<any> = [],
  callOnInit = true,
) => {
  const [value, setValue] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const callContract = async () => {
    setLoading(true)
    // const contract = new ethers.Contract(contractAddress, contractAbi, magicWeb3)
    // try {
    //   const newValue = await contract[methodName](...attr)
    //   setValue(newValue)
    // } catch (newError) {
    //   console.error('loading contract ', newError)
    //   setError(newError)
    // }
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
