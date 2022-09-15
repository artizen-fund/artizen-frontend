import { useContext } from 'react'
import styled from 'styled-components'
import { PagePadding } from '@components'
import { rgba, DonationContext } from '@lib'
import { breakpoint, palette } from '@theme'

interface IShelf {
  shelfKey: string
  shadowVisible: boolean
  children: React.ReactNode
}

const Shelf = ({ shelfKey, shadowVisible, children }: IShelf) => {
  const { visibleShelf, toggleShelf } = useContext(DonationContext)
  return (
    <>
      <Wrapper {...{ shadowVisible }} visible={shelfKey === visibleShelf}>
        <PagePadding>{children}</PagePadding>
      </Wrapper>
      <Onionskin className={shelfKey === visibleShelf ? 'visible' : ''} onClick={() => toggleShelf?.()} />
    </>
  )
}

const Wrapper = styled.div<Pick<IShelf, 'shadowVisible'> & { visible: boolean }>`
  position: fixed;
  z-index: 101;
  width: 100%;
  left: 0;
  top: 64px;
  max-height: calc(100vh - 64px);
  max-height: calc(100dvh - 64px);
  overflow: scroll;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    top: 72px;
    max-height: none;
    overflow: visible;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 88px;
  }

  background: ${props => rgba(palette.white, props.shadowVisible ? 0.98 : 1)};
  @media (prefers-color-scheme: dark) {
    background: ${props => rgba(palette.slate, props.shadowVisible ? 0.98 : 1)};
    color: ${rgba(palette.moon)};
  }
  filter: drop-shadow(
    ${props => (props.shadowVisible ? '0px 4px 16px rgba(0, 0, 0, 0.48)' : '0px 0.5px 0px rgba(217, 219, 224, 1)')}
  );
  backdrop-filter: blur(${props => (props.shadowVisible ? 16 : 0)}px);

  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? 0 : 30)}px);
  transition: opacity 0.3s ease-in-out, transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), filter 0.3s 0s ease-in-out,
    background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out;

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
  transition: opacity 0.15s 0s ease-in-out;
  pointer-events: none;
  &.visible {
    opacity: 1;
    pointer-events: all;
    transition: opacity 1.5s 0.15s ease-in-out;
  }
  will-change: opacity;
`

export default Shelf
