import { Layout, CreateGrants } from '@components'
import { useSession } from 'next-auth/react'

const grantDetails = () => {
  const { status } = useSession()

  return (
    <Layout>
      {status !== 'authenticated' && <div>Login with Metamask</div>}
      {status === 'authenticated' && (
        <>
          <CreateGrants />
        </>
      )}
    </Layout>
  )
}

export default grantDetails
