import styled from 'styled-components'
import { breakpoint } from '@theme'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <Wrapper>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </Wrapper>
)

const Wrapper = styled.div``

const Main = styled.main`
  padding-top: 64px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding-top: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding-top: 88px;
  }
`

export default Layout
