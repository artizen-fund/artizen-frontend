import styled from 'styled-components'
import { Button } from '@components'
import { breakpoint } from '@theme'

const CloseButton = styled(props => (
  <Button {...props} outline glyphOnly glyph="cross">
    Close
  </Button>
))<{ visible: boolean }>`
  position: absolute;
  z-index: 1002;
  top: 0px;
  right: 0px;
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    top: -25px;
    right: -25px;
  }

  cursor: pointer;
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
`

export default CloseButton
