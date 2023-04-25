import styled from 'styled-components'
import { Button } from '@components'
import { breakpoint } from '@theme'

const CloseButton = styled(props => (
  <Button {...props} glyphOnly glyph="cross" level={0}>
    Close
  </Button>
))<{ visible: boolean }>`
  position: absolute !important;
  z-index: 1002;
  top: -28px;
  right: -28px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    top: -32px;
    right: -32px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: -36px;
    right: -36px;
  }

  cursor: pointer;
  transform: scale(${props => (props.visible ? 1 : 0)});
  transition: transform 0.3s cubic-bezier(0.44, 1.86, 0.74, 1);
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
`

export default CloseButton
