import styled from 'styled-components'
import { Spinner } from '@components'

const Header = () => (
  <Wrapper>
    <Spinner />
    This is a header!
  </Wrapper>
)

const Wrapper = styled.header``

export default Header
