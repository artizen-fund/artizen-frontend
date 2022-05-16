import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

const Message = styled.div<{ virgin: boolean; errorCount: number }>`
  position: absolute;
  bottom: 5px;
  left: 16px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    left: 24px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    left: 32px;
  }
  color: ${rgba(palette.uiAlert)};
  font-size: 8px;
  opacity: ${props => (!props.virgin && props.errorCount > 0 ? 1 : 0)};
  transition: opacity 0.15s 0.1s ease-in-out;
`

export default Message
