import { Grants, Layout, Wallet, CreateGrants } from '@components'

const ManageGrants = ({ chains }: { chains: any }) => {
  return (
    <Layout>
      <Wallet chains={chains}></Wallet>
      <div>display grants</div>
    </Layout>
  )
}

export default ManageGrants
