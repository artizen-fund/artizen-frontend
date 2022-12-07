import { Grants, Layout, CreateGrants } from '@components'
import { useSession } from 'next-auth/react'

const grantDetails = ({ chains }: { chains: any }) => {
  const { status } = useSession()

  return (
    <Layout>
      {status !== 'authenticated' && <div>Login with Metamask</div>}
      {status === 'authenticated' && (
        <>
          <CreateGrants />
          <Grants />
        </>
      )}
    </Layout>
  )
}

export default grantDetails
