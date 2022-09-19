import { useState, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Button, Logo, DonationShelf, DonationGuide, Onionskin } from '@components'
import AccountButton from './AccountButton'
import SessionShelf from './SessionShelf'
import HowItWorks from './HowItWorks'
import Shelf from './Shelf'
import { breakpoint, palette, glyphKey } from '@theme'

import { rgba, DonationContext } from '@lib'

const Header = () => {
  const { visibleShelf, toggleShelf } = useContext(DonationContext)
  const [shadowVisible, setShadowVisible] = useState(false)
  useScrollPosition(({ currPos }) => setShadowVisible(currPos.y > 0), [], undefined, true, 50)

  return (
    <>
      <Wrapper {...{ shadowVisible }} className={visibleShelf ? 'visibleShelf' : ''}>
        <Items>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <MobileNavButton
            onClick={() => toggleShelf?.('howItWorks')}
            icon={glyphKey.arrow}
            iconOnRight
            outline
            level={1}
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
              <li onClick={() => toggleShelf?.('howItWorks')}>How it Works</li>
            </ul>
          </Nav>
          <Button onClick={() => toggleShelf?.('donate')} glyph={glyphKey.donate} level={1}>
            Donate
          </Button>
          <AccountButton onClick={() => toggleShelf?.('session')} />
        </Items>
      </Wrapper>
      <Shelf shelfKey="session" {...{ shadowVisible }}>
        <SessionShelf hideShelf={() => toggleShelf?.()} />
      </Shelf>
      <Shelf shelfKey="howItWorks" {...{ shadowVisible }}>
        <HowItWorks />
      </Shelf>
      <Shelf shelfKey="donate" {...{ shadowVisible }} hasBreadcrumbs>
        <DonationShelf />
      </Shelf>
      <DonationGuide />
      <Onionskin />
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

  padding: 0 24px;
  width: 100%;
  height: 64px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 88px;
  }
  @media only screen and (min-width: 1680px) {
    padding: 0 calc((100vw - 1600px) / 2);
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

const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    gap: 20px;
  }
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
  border: 0.5px solid ${rgba(palette.stone)};
  @media (prefers-color-scheme: dark) {
    border: 0.5px solid ${rgba(palette.barracuda)};
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: none !important;
  }
`

export default Header
