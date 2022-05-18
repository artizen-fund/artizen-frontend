import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export interface ProgressBarProps {
  children: number
  noSmoothing?: boolean
}

const ProgressBar = styled.div<ProgressBarProps>`
  height: 4px;
  background-color: ${rgba(palette.stone, 0.24)};
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.barracuda, 0.24)};
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 6px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 8px;
  }
  border-radius: 9999px;
  color: transparent;

  &:after {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.children}%;
    max-width: 100%;

    content: '${props => props.children}%';
    border-radius: 9999px;
    background-color: ${rgba(palette.algae)};
    ${props =>
      !props.noSmoothing &&
      `
      transition: width 0.3s ease-in-out;
    `}
  }
`

export default ProgressBar
