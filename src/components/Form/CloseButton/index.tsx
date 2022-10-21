import styled from 'styled-components'
import { Icon } from '@components'
import { breakpoint } from '@theme'

const CloseButton = styled(props => <Icon level={0} {...props} glyph="cross" />)<{ visible: boolean }>`
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

  transform: scale(${props => (props.visible ? 1 : 0)});
  transition: transform 0.6s cubic-bezier(0.44, 1.86, 0.74, 1);
`

export default CloseButton
