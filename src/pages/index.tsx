import styled from 'styled-components'
import type { NextPage } from 'next'
import { Layout } from '@components'
import { CreateTopUpWallet } from '@lib'
import { breakpoint } from '@theme'

const Home: NextPage = () => {
  return (
    <Layout>
      <CreateTopUpWallet />
      <p>welcome to Artizen</p>
    </Layout>
  )
}

export default Home
