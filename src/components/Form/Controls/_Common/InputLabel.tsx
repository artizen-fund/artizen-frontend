/* Label for input[type=text/email/password], textarea, and select inputs */

import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export default styled.label`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
  left: 16px;
  width: calc(100% - 88px);

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: calc(100% - 92px);
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: calc(100% - 96px);
  }

  color: ${rgba(palette.barracuda)};
  letter-spacing: 0.5px;
  white-space: nowrap;

  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  transform-origin: center left;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
  will-change: color, transform;
  pointer-events: none;

  .PhoneInput:focus-within ~ &,
  .PhoneInput.hasData ~ &,
  input:focus ~ &,
  input:not(:placeholder-shown) ~ &,
  input:required:valid ~ &,
  select.hasData ~ &,
  select:focus ~ &,
  select:required:valid ~ & {
    transform: translate3d(0, -12px, 0) scale3d(0.8, 0.8, 1);
  }

  white-space: nowrap;
`
