import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { CuratorCheck, Layout, CreateGrants, Spinner } from '@components'

const GrantDetails = () => {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status])

  return (
    <Layout>
      <CuratorCheck />
      {status !== 'authenticated' ? <Spinner /> : <CreateGrants />}
    </Layout>
  )
}

export default GrantDetails
