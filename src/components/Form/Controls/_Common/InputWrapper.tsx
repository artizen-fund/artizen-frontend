/* Many styles are shared between input[type=text/email/password], textarea, and select
 * This wrapper applies those styles to child elements.
 * An alternate approach might be to use a css`` interploation.
 * https://styled-components.com/docs/api#css
 */

import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export default styled.div<{
  hasWidget?: boolean
  hasStatusIcon: boolean
  disabled?: boolean
}>`
  position: relative;

  input,
  textarea,
  select {
    appearance: none;
    outline: none;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 56px;
    padding: 18px ${props => (props.hasStatusIcon ? 48 : 16)}px 0 16px;
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      height: 64px;
      padding: 20px ${props => (props.hasStatusIcon ? 72 : 24)}px 0 24px;
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      height: 72px;
      padding: 22px ${props => (props.hasStatusIcon ? 88 : 32)}px 0 32px;
    }

    border-width: 1px 1px 4px 1px;
    border-style: solid;
    border-radius: 8px;

    background-color: ${rgba(palette.white)};
    color: ${rgba(palette.night)};
    border-color: ${rgba(palette.stone)};
    &:hover {
      border-color: ${rgba(palette.barracuda)};
    }
    &:focus,
    &.hasData {
      border-color: ${rgba(palette.night)};
    }

    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.moon)};
      color: ${rgba(palette.night)};
      border-color: ${rgba(palette.moon)};
      &:hover {
        border-color: ${rgba(palette.barracuda)};
      }
      &:focus,
      &.hasData {
        background-color: ${rgba(palette.white)};
        border-color: ${rgba(palette.barracuda)};
      }
    }

    text-indent: 0;
    font-size: 17px;
    font-family: 'roc-grotesk', verdana, sans-serif;

    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out;
    will-change: background, border, color;
    pointer-events: ${props => (props.disabled ? 'none' : 'inherit')};
  }

  input {
    &::placeholder {
      color: ${rgba(palette.barracuda, 0)};
      transition: color 0.15s ease-in-out;
    }
    &:focus::placeholder {
      color: ${rgba(palette.barracuda, 1)};
    }
  }

  input[type='date'] {
    justify-content: flex-start;
  }

  input:disabled {
    background-color: ${rgba(palette.stone)};
    border-color: ${rgba(palette.stone)};
  }
`
