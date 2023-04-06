import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
// import { useAccount } from 'wagmi'

const CuratorCheck = () => {
  const router = useRouter()
  const { status, data } = useSession()
  // const { isConnected } = useAccount()

  useEffect(() => {
    if (status === 'unauthenticated' || (!!data && !data.user?.isCurator)) {
      router.push('/')
    }
  }, [status, data])
  return <></>
}

export default CuratorCheck
