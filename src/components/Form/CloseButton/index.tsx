import styled from 'styled-components'
import { Icon } from '@components'
import { breakpoint } from '@theme'

const CloseButton = styled(props => <Icon {...props} glyph="cross" />)<{ visible: boolean }>`
  position: absolute;
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
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
`

export default CloseButton
