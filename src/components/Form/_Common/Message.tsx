import styled from 'styled-components'
import { palette } from '@theme'
import { rgba } from '@lib'

const Message = styled.div<{ virgin: boolean; errorCount: number }>`
  position: absolute;
  bottom: 3px;
  left: 33px;
  color: ${rgba(palette.uiAlert)};
  font-size: 8px;
  opacity: ${props => (!props.virgin && props.errorCount > 0 ? 1 : 0)};
  transition: opacity 0.15s 0.1s ease-in-out;
`

export default Message
