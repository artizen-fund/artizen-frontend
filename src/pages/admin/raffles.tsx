import { CreateRaffle, Layout, ListRaffle, Wallet } from '@components'
import { getWagmiClient } from '@lib'

import { WagmiConfig } from 'wagmi'

const { client, chains } = getWagmiClient()

const CreateRaffleWrapper = () => {
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Wallet chains={chains}></Wallet>
        <ListRaffle></ListRaffle>
        <CreateRaffle />
      </Layout>
    </WagmiConfig>
  )
}

export default CreateRaffleWrapper
