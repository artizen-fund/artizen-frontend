import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { assert } from '@lib'

const CuratorCheck = () => {
  const router = useRouter()
  const { status, data } = useSession()
  console.log('data   ', data)
  useEffect(() => {
    if (status === 'unauthenticated' || (!!data && (data as any).user?.isCurator)) {
      router.push('/grants/today')
    }
  }, [status, data])
  return <></>
}

export default CuratorCheck
