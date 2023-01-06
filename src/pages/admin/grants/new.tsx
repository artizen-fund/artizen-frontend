import { useSession } from 'next-auth/react'
import { CuratorCheck, Layout, NewGrantForm, Spinner, PagePadding } from '@components'

const GrantDetails = () => {
  const { status } = useSession()
  return (
    <Layout>
      <CuratorCheck />
      <PagePadding>{status !== 'authenticated' ? <Spinner /> : <NewGrantForm />}</PagePadding>
    </Layout>
  )
}

export default GrantDetails
