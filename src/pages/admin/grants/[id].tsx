import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Layout, CreateGrants, Spinner } from '@components'
import { assert } from '@lib'

const grantDetails = () => {
  const router = useRouter()
  const { status, data } = useSession()

  useEffect(() => {
    const GRANT_CURATOR_ROLE = assert(process.env.NEXT_PUBLIC_GRANT_CURATOR_ROLE, 'NEXT_PUBLIC_GRANT_CURATOR_ROLE')
    if (status === 'unauthenticated' && data !== null && (data as any).user?.id === GRANT_CURATOR_ROLE) {
      router.push('/')
    }
  }, [status, data])

  return <Layout>{status !== 'authenticated' ? <Spinner /> : <CreateGrants />}</Layout>
}

export default grantDetails
