import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const CuratorCheck = () => {
  const router = useRouter()
  const { status, data } = useSession()
  useEffect(() => {
    if (status === 'unauthenticated' || (!!data && !data.user?.isCurator)) {
      router.push('/grants/today')
    }
  }, [status, data])
  return <></>
}

export default CuratorCheck
