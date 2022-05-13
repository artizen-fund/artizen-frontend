import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export default styled.div<{
  hasIcon: boolean
  disabled: boolean
  outline: boolean
}>`
  position: relative;
  input,
  textarea,
  select {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => (props.outline ? rgba(palette.moon, 0.8) : 'transparent')};
    @media (prefers-color-scheme: dark) {
      background-color: ${props => (props.outline ? rgba(palette.night, 0.8) : 'transparent')};
    }
    width: 100%;
    height: 56px;
    border: ${props => (props.outline ? 1 : 0)}px solid ${rgba(palette.night, 0.32)};
    @media (prefers-color-scheme: dark) {
      border: ${props => (props.outline ? 1 : 0)}px solid ${rgba(palette.moon, 0.32)};
    }
    border-radius: 0;
    outline: none;
    color: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon)};
    }
    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    will-change: background, border;
    pointer-events: ${props => (props.disabled ? 'none' : 'inherit')};
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    appearance: none;
    text-indent: 0;

    padding: 18px ${props => (props.hasIcon ? 48 : 16)}px 0 16px;
    @media only screen and (min-width: ${breakpoint.tablet}px) {
      padding-right: ${props => (props.hasIcon ? 56 : 16)}px;
    }

    @media only screen and (min-width: ${breakpoint.laptop}px) {
      height: 64px;
      padding: 20px ${props => (props.hasIcon ? 72 : 24)}px 0 24px;
    }

    @media only screen and (min-width: ${breakpoint.desktop}px) {
      height: 72px;
      padding: 22px ${props => (props.hasIcon ? 88 : 32)}px 0 32px;
    }
  }

  select:focus,
  input:focus {
    background-color: ${rgba(palette.white)};
    ${props => (props.outline ? 'border-color:' + rgba(palette.night, 0.64) + ';' : '')}
    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.black)};
      ${props => (props.outline ? 'border-color:' + rgba(palette.moon, 0.64) + ';' : '')}
    }
  }
`
