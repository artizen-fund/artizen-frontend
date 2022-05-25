import type { NextPage } from 'next'
import { Layout, Newsletter } from '@components'
import { CreateTopUpWallet } from '@lib'

const Home: NextPage = () => {
  return (
    <Layout>
      <CreateTopUpWallet />
      <p>welcome to Artizen</p>
      <Newsletter />
      <p>love us some Artizen</p>
    </Layout>
  )
}

export default Home
