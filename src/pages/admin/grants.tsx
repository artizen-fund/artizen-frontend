import { Grants, Layout, Wallet, CreateGrants } from '@components'

const ManageGrants = ({ chains }: { chains: any }) => {
  return (
    <Layout>
      <Wallet chains={chains}></Wallet>
      <CreateGrants />
      {/* <Grants /> */}
    </Layout>
  )
}

export default ManageGrants
