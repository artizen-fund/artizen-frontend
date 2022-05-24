/* This is the basic wrapper that's used in common between input[type=text/email/password], textarea, and select
 * It holds the input, label, and error messaging components.
 */

import styled from 'styled-components'

export default styled.div<{
  disabled?: boolean
  hasMessage?: boolean
}>`
  position: relative;
  width: 100%;
  height: fit-content;
  padding-bottom: ${props => (props.hasMessage ? 25 : 0)}px;
  transition: padding 0.5s ease-in-out;
`
