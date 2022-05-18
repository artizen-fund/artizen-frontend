/* Optional floating icon for input[type=text/email/password], textarea, and select inputs */

import styled from 'styled-components'
import { Icon } from '@components'
import { breakpoint } from '@theme'

export default styled(props => <Icon {...props} />)`
  z-index: 2;
  position: absolute;
  top: 0;
  right: 16px;
  bottom: 0;
  margin: auto 0;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    right: 24px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    right: 32px;
  }
`
