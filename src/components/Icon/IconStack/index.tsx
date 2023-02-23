import styled from 'styled-components'
import { rgba, sizeForLevel } from '@lib'
import { palette, breakpoint } from '@theme'

interface IIconStack {
  children: React.ReactNode
}

/* note: this assumes that icons are L2 size needs refinements for other sizes */

const IconStack = ({ children }: IIconStack) => {
  const iconLevel = 1
  /* future enhancement: support all levels
   * will need a dictionary for the gap, line height (should half), and left value
   */
  return <Wrapper {...{ iconLevel }}>{children}</Wrapper>
}

const Wrapper = styled.ol<{ iconLevel: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  list-style-type: none;
  gap: 10px;
  padding: 5px 0;
  margin: 3px 0 3px 22px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 12px;
    padding: 7px 0;
    margin: 16px 0 16px 22px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
    padding: 7px 0;
    margin: 23px 0 23px 22px;
  }

  > * {
    display: relative;

    &:before,
    &:after {
      content: ' ';
      position: absolute;
      z-index: 0;
      width: 2px;
      height: 100%;
      left: ${props => sizeForLevel('mobile', props.iconLevel) / 2 - 1}px;
      height: 5px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        height: 6px;
        left: ${props => sizeForLevel('laptop', props.iconLevel) / 2 - 1}px;
      }
      @media only screen and (min-width: ${breakpoint.desktop}px) {
        height: 8px;
        left: ${props => sizeForLevel('desktop', props.iconLevel) / 2 - 1}px;
      }

      background: ${rgba(palette.night)};
      @media (prefers-color-scheme: dark) {
        background: ${rgba(palette.moon)};
      }
    }

    &:before {
      top: -5px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        top: -6px;
      }
      @media only screen and (min-width: ${breakpoint.desktop}px) {
        top: -8px;
      }
    }

    &:after {
      bottom: -5px;
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        bottom: -6px;
      }
      @media only screen and (min-width: ${breakpoint.desktop}px) {
        bottom: -8px;
      }
    }
  }

  > * {
    position: relative;
    z-index: 1;
  }
`

export default IconStack
