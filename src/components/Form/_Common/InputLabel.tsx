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
  width: calc(100% - 32px);

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    left: 24px;
    width: calc(100% - 48px);
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    left: 32px;
    width: calc(100% - 64px);
  }

  color: ${rgba(palette.barracuda)};

  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  transform-origin: center left;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
  will-change: color, transform;
  pointer-events: none;

  input:focus ~ &,
  input.hasData ~ &,
  input:required:valid ~ &,
  select:focus ~ &,
  select.hasData ~ &,
  select:required:valid ~ & {
    transform: translate3d(0, -12px, 0) scale3d(0.8, 0.8, 1);
    color: ${rgba(palette.night, 0.8)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon, 0.8)};
    }
  }
`
