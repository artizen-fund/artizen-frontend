import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export default styled.label`
  position: absolute;
  left: 16px;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
  width: calc(100% - 32px);

  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }

  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  transform-origin: center left;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
  will-change: color, transform;
  pointer-events: none;

  input:focus ~ &,
  input:placeholder-shown ~ &,
  input.hasData ~ &,
  input:required:valid ~ & {
    transform: translate3d(0, -12px, 0) scale3d(0.8, 0.8, 1);
    color: ${rgba(palette.night, 0.8)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon, 0.8)};
    }
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    left: 24px;
    width: calc(100% - 48px);
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    left: 32px;
    width: calc(100% - 64px);
  }
`
