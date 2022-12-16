import { useSession } from 'next-auth/react'
import { CuratorCheck, Layout, CreateGrants, Spinner } from '@components'

const GrantDetails = () => {
  const { status } = useSession()

  return (
    <Layout>
      <CuratorCheck />
      {status !== 'authenticated' ? <Spinner /> : <CreateGrants />}
    </Layout>
  )
}

export default GrantDetails
