/* Optional floating icon for input[type=text/email/password], textarea, and select inputs */

import styled from 'styled-components'
import { Glyph } from '@components'
import { breakpoint } from '@theme'

const InputGlyph = (props: any) => (
  <Wrapper>
    <Glyph {...props} />
  </Wrapper>
)

const Wrapper = styled.div`
  z-index: 2;
  position: absolute;
  right: 16px;
  top: 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    right: 24px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    right: 32px;
  }
`

export default InputGlyph
