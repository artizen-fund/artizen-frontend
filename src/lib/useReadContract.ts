import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useSession } from '@lib'

export const useReadContract = (
  contractAddress: string,
  contractAbi: string,
  methodName: string,
  attr: Array<unknown> = [],
) => {
  const { magic } = useSession()
  if (magic === undefined) return

  const [value, setValue] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const callContract = useCallback(async () => {
    setLoading(true)

    // todo: typescript says this is all wrong… will troubleshoot when the time comes
    // const magicWeb3 = new ethers.providers.Web3Provider(magic.rpcProvider)
    //
    // const contract = new ethers.Contract(contractAddress, contractAbi, magicWeb3)
    //
    // try {
    //   const value = await contract[methodName](...attr)
    //
    //   setValue(value)
    // } catch (error: unknown) {
    //   setError(error)
    // }
    // setLoading(false)
  }, [attr, contractAbi, contractAddress, methodName])

  useEffect(() => {
    callContract()
  }, [])

  return [value, loading, error]
}
