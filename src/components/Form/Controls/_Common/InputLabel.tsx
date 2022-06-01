/* Label for input[type=text/email/password], textarea, and select inputs */

import styled from 'styled-components'
import { breakpoint, palette, Palette } from '@theme'
import { rgba } from '@lib'

export default styled.label<{ hasWidget?: boolean }>`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
  left: ${props => (props.hasWidget ? 72 : 16)}px;
  width: calc(100% - 88px);

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    left: ${props => (props.hasWidget ? 76 : 16)}px;
    width: calc(100% - 92px);
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    left: ${props => (props.hasWidget ? 80 : 16)}px;
    width: calc(100% - 96px);
  }

  color: ${rgba(palette.barracuda)};
  letter-spacing: 0.5px;

  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  transform-origin: center left;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
  will-change: color, transform;
  pointer-events: none;

  .PhoneInput:focus-within ~ &,
  .PhoneInput.hasData ~ &,
  input:focus ~ &,
  input.hasData ~ &,
  input:required:valid ~ &,
  select:focus ~ &,
  select.hasData ~ &,
  select:required:valid ~ & {
    transform: translate3d(0, -12px, 0) scale3d(0.8, 0.8, 1);
  }
`
