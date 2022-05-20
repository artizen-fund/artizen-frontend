import styled from 'styled-components'
import type { NextPage } from 'next'
import { Header } from '@components'
import { CreateTopUpWallet } from '@lib'
import { breakpoint } from '@theme'

const Home: NextPage = () => {
  return (
    <>
      <CreateTopUpWallet />
      <Header />
      <Main>
        <p>welcome to Artizen</p>
      </Main>
    </>
  )
}

const Main = styled.main`
  padding-top: 64px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding-top: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding-top: 88px;
  }
`

export default Home
