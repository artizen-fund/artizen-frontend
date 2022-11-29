import { Grants, Layout, Wallet } from '@components'

const ManageGrants = ({ chains }: { chains: any }) => {
  return (
    <Layout>
      <Wallet chains={chains}></Wallet>
      <Grants />
    </Layout>
  )
}

export default ManageGrants
