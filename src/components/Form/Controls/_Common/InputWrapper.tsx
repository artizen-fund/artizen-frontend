/* Many styles are shared between input[type=text/email/password], textarea, and select
 * This wrapper applies those styles to child elements.
 * An alternate approach might be to use a css`` interploation.
 * https://styled-components.com/docs/api#css
 */

import styled, { css } from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

/* Note: if this palette gets unweildy, we could switch to
 *       a helper like the <Button /> component uses.
 */
const InputPalette = css`
  background-color: ${rgba(palette.white)};
  color: ${rgba(palette.night)};
  border-color: ${rgba(palette.stone)};

  &:hover {
    border-color: ${rgba(palette.barracuda)};
  }

  &:focus {
    border-width: 1px 1px 2px 1px;
  }

  &:focus,
  &.hasData,
  &:not([value='']),
  &:not(:placeholder-shown) {
    border-color: ${rgba(palette.night)};
  }

  &::placeholder {
    color: ${rgba(palette.barracuda, 0)};
    transition: color 0.15s ease-in-out;
  }

  &:focus::placeholder {
    color: ${rgba(palette.barracuda, 1)};
  }

  &:disabled {
    background-color: ${rgba(palette.stone)};
    border-color: ${rgba(palette.stone)};
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.moon)};
    color: ${rgba(palette.night)};
    border-color: ${rgba(palette.moon)};

    &:hover {
      border-color: ${rgba(palette.barracuda)};
    }

    &:focus,
    &:not([value='']),
    &.hasData,
    &:not(:placeholder-shown) {
      background-color: ${rgba(palette.white)};
      border-color: ${rgba(palette.barracuda)};
    }
  }
`

const InputTypography = css`
  text-indent: 0;
  font-size: 17px;
  font-family: 'roc-grotesk', verdana, sans-serif;
`

export default styled.div<{
  hasWidget?: boolean
  hasStatusGlyph?: boolean
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
    padding: 18px ${props => (props.hasStatusGlyph ? 48 : 16)}px 0 16px;
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      height: 64px;
      padding: 20px ${props => (props.hasStatusGlyph ? 72 : 24)}px 0 24px;
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      height: 72px;
      padding: 22px ${props => (props.hasStatusGlyph ? 88 : 32)}px 0 32px;
    }

    border-width: 1px 1px 1px 1px;
    border-style: solid;
    border-radius: 0px;

    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, border-width 0.3s ease-in-out,
      color 0.3s ease-in-out;
    will-change: background, border, color;
    pointer-events: ${props => (props.disabled ? 'none' : 'inherit')};

    ${() => InputPalette}
    ${() => InputTypography}
  }

  input[type='date'] {
    justify-content: flex-start;
  }
`
