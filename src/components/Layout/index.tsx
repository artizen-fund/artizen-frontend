import styled from 'styled-components'
import { breakpoint } from '@theme'
import Header from './Header'
import Footer from './Footer'
import Onionskin from './Onionskin'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <Wrapper>
    <Header />
    <Main>{children}</Main>
    <Footer />
    <Onionskin />
  </Wrapper>
)

const Wrapper = styled.div``

const Main = styled.main`
  padding-top: 64px;
  min-height: 75vh;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding-top: 72px;
    min-height: calc(100vh - 595px);
  }
`

export default Layout
