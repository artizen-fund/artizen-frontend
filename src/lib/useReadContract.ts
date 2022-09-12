import { ContractInterface, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useMagic } from '@lib'

export const useReadContract = (
  contractAddress: string,
  contractAbi: ContractInterface,
  methodName: string,
  attr: Array<any> = [],
  callOnInit = true,
) => {
  const { magic } = useMagic()

  const [value, setValue] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const callContract = async () => {
    if (!magic) return
    setLoading(true)

    console.log('callContract  start ')

    const magicWeb3 = new ethers.providers.Web3Provider(magic.rpcProvider as any)

    const contract = new ethers.Contract(contractAddress, contractAbi, magicWeb3)

    console.log('contract ', contract)

    try {
      console.log('methodName  ', methodName)
      console.log('attr  ', attr)
      const newValue = await contract[methodName](...attr)

      console.log('newValue ', newValue)
      setValue(newValue)
    } catch (newError) {
      console.log('newError ', newError)
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
