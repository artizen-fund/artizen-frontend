import { CreateRaffle, Layout, ListRaffle, Wallet } from '@components'
import { getWagmiClient, UserContext } from '@lib'
import { useContext } from 'react'

import { WagmiConfig } from 'wagmi'

const { client, chains } = getWagmiClient()

const ManageRaffle = () => {
  const { loggedInUser } = useContext(UserContext)

  return (
    <WagmiConfig client={client}>
      <Layout>
        {loggedInUser && (
          <>
            <Wallet chains={chains}></Wallet>
            <ListRaffle></ListRaffle>
            <CreateRaffle />
          </>
        )}
      </Layout>
    </WagmiConfig>
  )
}

export default ManageRaffle
