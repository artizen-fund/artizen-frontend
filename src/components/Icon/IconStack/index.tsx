import styled from 'styled-components'
import { rgba } from '@lib'
import { palette, breakpoint } from '@theme'

interface IIconStack {
  children: React.ReactNode
}

/* note: this assumes that icons are L2 size needs refinements for other sizes */

const IconStack = ({ children }: IIconStack) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.ol`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  list-style-type: none;
  padding: 5px 0;
  margin: 3px 0 3px 22px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    padding: 7px 0;
    margin: 3px 0 3px 22px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 7px 0;
    margin: 16px 0 16px 22px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 7px 0;
    margin: 23px 0 23px 22px;
  }

  &:before {
    content: ' ';
    position: absolute;
    z-index: 0;
    top: 0;
    width: 2px;
    height: 100%;
    left: 19px;
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      left: 23px;
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      left: 27px;
    }

    background: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      background: ${rgba(palette.moon)};
    }
  }
  > * {
    position: relative;
    z-index: 1;
  }
`

export default IconStack
