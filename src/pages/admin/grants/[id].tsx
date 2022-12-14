import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Layout, CreateGrants, Spinner } from '@components'

const grantDetails = () => {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status])

  return <Layout>{status !== 'authenticated' ? <Spinner /> : <CreateGrants />}</Layout>
}

export default grantDetails
