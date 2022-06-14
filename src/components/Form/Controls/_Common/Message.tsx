/* Error messaging for most/all components.
 * (but mostly input[type=text/email/password], textarea, and select)
 */

import styled from 'styled-components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'

const Message = styled.div`
  position: absolute;
  padding-top: 5px;

  top: 56px;
  left: 16px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    left: 24px;
    top: 64px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    left: 32px;
    top: 72px;
  }

  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.3s ease-in-out, transform 0.35s ease-in-out;
  &.hasErrors {
    opacity: 1;
    transform: translateX(0px);
  }

  color: ${rgba(palette.uiAlert)};
  ${typography.label.l3}
`

export default Message
