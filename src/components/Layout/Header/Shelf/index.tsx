import styled from 'styled-components'
import { PagePadding } from '@components'
import { rgba } from '@lib'
import { breakpoint, palette } from '@theme'

interface IShelf {
  visible: boolean
  hideShelf: any
  children: React.ReactNode
}

const Shelf = ({ visible, hideShelf, children }: IShelf) => {
  return (
    <>
      <Wrapper {...{ visible }}>
        <PagePadding>{children}</PagePadding>
      </Wrapper>
      <Onionskin className={visible ? 'visible' : ''} onClick={hideShelf} />
    </>
  )
}

const Wrapper = styled.div<Pick<IShelf, 'visible'>>`
  position: fixed;
  z-index: 101;
  width: 100%;
  left: 0;
  top: 64px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    top: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 88px;
  }

  background: ${rgba(palette.white)};

  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
    color: ${rgba(palette.moon)};
  }

  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? 0 : -100)}px);
  transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
  will-change: transition, transform;
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
`

const Onionskin = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
  pointer-events: none;
  &.visible {
    opacity: 1;
    pointer-events: all;
    transition: opacity 1s ease-in-out;
  }
  will-change: opacity;
`

export default Shelf
