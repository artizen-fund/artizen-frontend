import { Grants, Layout, Wallet, CreateGrants } from '@components'

const grantDetails = ({ chains }: { chains: any }) => {
  return (
    <Layout>
      <Wallet chains={chains}></Wallet>
      <CreateGrants />
      <Grants />
    </Layout>
  )
}

export default grantDetails
