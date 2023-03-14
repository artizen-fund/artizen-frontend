import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

const CuratorCheck = () => {
  const router = useRouter()
  const { status, data } = useSession()
  const { isConnected } = useAccount()

  console.log('status  ', status)
  console.log('data ', data)
  console.log('isConnected  ', isConnected)

  useEffect(() => {
    if (status === 'unauthenticated' || (!!data && !data.user?.isCurator)) {
      router.push('/grants/today')
    }
  }, [status, data])
  return <></>
}

export default CuratorCheck
