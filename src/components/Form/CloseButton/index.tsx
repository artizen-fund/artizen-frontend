import styled from 'styled-components'
import { Icon } from '@components'
import { breakpoint } from '@theme'

const CloseButton = styled(props => <Icon {...props} />)<{ visible: boolean }>`
  position: absolute;
  z-index: 1002;
  top: 60px;
  right: 0px;
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    top: 100px;
    right: 25px;
  }

  cursor: pointer;
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
`

export default CloseButton
