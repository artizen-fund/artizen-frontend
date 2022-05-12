import type { NextPage } from 'next'
import { Header } from '@components'
import { CreateTopUpWallet } from '@lib'

const Home: NextPage = () => {
  return (
    <>
      <CreateTopUpWallet />
      <Header />
      <p>Home!</p>
    </>
  )
}

export default Home
