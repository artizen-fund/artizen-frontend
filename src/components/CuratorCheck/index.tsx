import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { assert } from '@lib'

const CuratorCheck = () => {
  const router = useRouter()
  const { status, data } = useSession()
  useEffect(() => {
    const GRANT_CURATOR_ROLE = assert(process.env.NEXT_PUBLIC_GRANT_CURATOR_ROLE, 'NEXT_PUBLIC_GRANT_CURATOR_ROLE')
    if (status === 'unauthenticated' && data !== null && (data as any).user?.id === GRANT_CURATOR_ROLE) {
      router.push('/')
    }
  }, [status, data])
  return <></>
}

export default CuratorCheck
