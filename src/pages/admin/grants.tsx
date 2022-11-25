import { Layout, Wallet } from '@components'
import { getWagmiClient } from '@lib'

import { WagmiConfig } from 'wagmi'

const { client, chains } = getWagmiClient()

const ManageGrants = () => {
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Wallet chains={chains}></Wallet>
      </Layout>
    </WagmiConfig>
  )
}

export default ManageGrants
