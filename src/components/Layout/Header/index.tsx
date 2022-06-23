import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Button } from '@components'
import AccountButton from './AccountButton'
import SessionShelf from './SessionShelf'
import HowItWorks from './HowItWorks'
import Shelf from './Shelf'
import { breakpoint, palette, glyphKey } from '@theme'
import { rgba } from '@lib'

type ShelfType = 'session' | 'howItWorks'

const Header = () => {
  const [shadowVisible, setShadowVisible] = useState(false)
  useScrollPosition(({ currPos }) => setShadowVisible(currPos.y > 0), [], undefined, true, 50)

  const [navVisible, setNavVisible] = useState(false)

  const [visibleShelf, setVisibleShelf] = useState<ShelfType>()
  const toggleShelf = (shelf?: ShelfType) => setVisibleShelf(shelf === visibleShelf ? undefined : shelf)

  return (
    <>
      <Wrapper {...{ shadowVisible }} className={visibleShelf ? 'visibleShelf' : ''}>
        <Items>
          <Link href="/">
            <a>
              <Logo>Artizen</Logo>
            </a>
          </Link>
          <MobileNavButton
            onClick={() => setNavVisible(!navVisible)}
            icon={glyphKey.arrow}
            iconOnRight
            outline
            size="l1"
          >
            Menu
          </MobileNavButton>
        </Items>
        <Items>
          <Nav>
            <ul>
              <li>
                <Link href="/">Leaderboard</Link>
              </li>
              <li onClick={() => toggleShelf('howItWorks')}>How it Works</li>
            </ul>
          </Nav>
          <Button href="/" glyph={glyphKey.donate} level={1}>
            Donate
          </Button>
          <AccountButton loggedOutAction={() => toggleShelf('session')} />
        </Items>
      </Wrapper>
      <Shelf visible={visibleShelf === 'session'} hideShelf={() => toggleShelf()} {...{ shadowVisible }}>
        <SessionShelf />
      </Shelf>
      <Shelf visible={visibleShelf === 'howItWorks'} hideShelf={() => toggleShelf()} {...{ shadowVisible }}>
        <HowItWorks />
      </Shelf>
    </>
  )
}

const Wrapper = styled.header<{ shadowVisible: boolean }>`
  position: fixed;
  z-index: 102;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 40px;
  width: 100%;
  height: 64px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 88px;
  }

  background: ${props => rgba(palette.white, props.shadowVisible ? 0.98 : 1)};
  @media (prefers-color-scheme: dark) {
    background: ${props => rgba(palette.slate, props.shadowVisible ? 0.98 : 1)};
  }
  filter: drop-shadow(
    ${props => (props.shadowVisible ? '0px 4px 16px rgba(0, 0, 0, 0.48)' : '0px 0.5px 0px rgba(217, 219, 224, 1)')}
  );
  backdrop-filter: blur(${props => (props.shadowVisible ? 16 : 0)}px);

  border-bottom: 0.5px solid transparent;
  transition: border-color 0.3s 0.15s ease-in-out, background-color 0.3s ease-in-out, filter 0.3s ease-in-out,
    backdrop-filter 0.3s ease-in-out;
  &.visibleShelf {
    filter: drop-shadow(0px 0.5px 0px rgba(217, 219, 224, 1));
    border-color: ${rgba(palette.stone)};
    @media (prefers-color-scheme: dark) {
      border-color: ${rgba(palette.barracuda, 0.64)};
    }
    transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out, filter 0.3s ease-in-out,
      backdrop-filter 0.3s ease-in-out;
  }
`

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 13px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    font-size: 15px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    font-size: 16px;
  }
  text-transform: uppercase;

  &:before {
    content: ' ';
    display: block;
    width: 40px;
    height: 40px;
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      height: 44px;
      width: 44px;
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      height: 48px;
      width: 48px;
    }
    background-color: ${rgba(palette.algae)};
    border-radius: 9999px;
    margin-right: 8px;
  }
`

const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`

const Nav = styled.div`
  display: none;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: contents;
  }
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    white-space: nowrap;
    li {
      cursor: pointer;
    }
  }
`

const MobileNavButton = styled(props => <Button {...props} />)`
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: none !important;
  }
`

export default Header
