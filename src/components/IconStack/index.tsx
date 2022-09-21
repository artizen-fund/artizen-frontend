import styled from 'styled-components'
import { rgba } from '@lib'
import { palette, breakpoint } from '@theme'

interface IIconStack {
  children: React.ReactNode
}

const IconStack = ({ children }: IIconStack) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.ol`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  padding: 10px 0;
  list-style-type: none;
  &:before {
    position: absolute;
    z-index: 0;
    left: 28px;
    top: 0;
    width: 2px;
    height: 100%;
    content: ' ';
    background: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      background: ${rgba(palette.moon)};
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      left: 35px;
    }
  }
  > * {
    position: relative;
    z-index: 1;
  }
`

export default IconStack
