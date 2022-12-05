import { Grants, Layout, Wallet, CreateGrants } from '@components'
import { useSession } from 'next-auth/react'

const grantDetails = ({ chains }: { chains: any }) => {
  const { data: session, status } = useSession()

  console.log('status     ', status)

  return (
    <Layout>
      <Wallet chains={chains}></Wallet>
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
