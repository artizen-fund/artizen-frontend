import Link from 'next/link'
import styled from 'styled-components'

const Header = () => (
  <Wrapper>
    <Link href="/">
      <a>Artizen</a>
    </Link>
  </Wrapper>
)

const Wrapper = styled.header``

export default Header
