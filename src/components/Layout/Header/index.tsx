import { useState, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Button, Logo, Modals } from '@components'
import AccountButton from './AccountButton'
import DonateButton from './DonateButton'
import AccountShelf from './AccountShelf'
import HowItWorks from './HowItWorks'
import Shelf from './Shelf'
import { breakpoint, palette, glyphKey } from '@theme'
import { rgba, LayoutContext, isProd, scrollToGrantExplorer } from '@lib'

const Header = () => {
  const { visibleShelf, toggleShelf } = useContext(LayoutContext)
  const [shadowVisible, setShadowVisible] = useState(false)
  useScrollPosition(({ currPos }) => setShadowVisible(currPos.y > 0), [], undefined, true, 50)

  const { pathname, push } = useRouter()
  const donateButtonAction = () => {
    if (pathname === '/grants/today') {
      scrollToGrantExplorer()
    } else {
      push('/grants/today')
    }
  }

  return (
    <>
      <Wrapper {...{ shadowVisible }} className={visibleShelf ? 'visibleShelf' : ''}>
        <Items>
          <Link href={`/grants/today`}>
            <Logo />
          </Link>
          <MobileNavButton
            onClick={() => toggleShelf?.('howItWorks')}
            glyph={glyphKey.arrow}
            glyphOnRight
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
                <Link target="_blank" href="https://artizen.link/apply">
                  Apply
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://help.artizen.fund/en/articles/6782291-how-the-artizen-fund-works">
                  How It Works
                </Link>
              </li>
            </ul>
          </Nav>
          <DonateButton onClick={() => donateButtonAction()} active={visibleShelf === 'donate'} />
          <AccountButton id="accountButton" active={visibleShelf === 'session'} />
        </Items>
      </Wrapper>
      <Shelf shelfKey="session" {...{ shadowVisible }}>
        <AccountShelf hideShelf={() => toggleShelf?.()} />
      </Shelf>
      <Shelf shelfKey="howItWorks" {...{ shadowVisible }}>
        <HowItWorks />
      </Shelf>
      <DebugTool production={isProd()} />
      <Modals />
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

  padding: 0 16px;
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
  filter: drop-shadow(
    ${props => (props.shadowVisible ? '0px 4px 16px rgba(0, 0, 0, 0.48)' : '0px 0.5px 0px rgba(217, 219, 224, 1)')}
  );
  @media (prefers-color-scheme: dark) {
    background: ${props => rgba(palette.slate, props.shadowVisible ? 0.98 : 1)};
    filter: drop-shadow(
      ${props => (props.shadowVisible ? '0px 4px 16px rgba(0, 0, 0, 0.48)' : '0px 0.5px 0px rgba(114, 124, 140, 0.64)')}
    );
  }
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

const DebugTool = styled.div<{ production: boolean }>`
  display: ${props => (props.production ? 'none' : 'block')};
  position: fixed;
  z-index: 9999;
  bottom: 0px;
  right: 0px;
  font-size: 8px;
  font-weight: 300;
  &:after {
    content: 'mobile';
    @media only screen and (min-width: ${breakpoint.phablet}px) {
      content: 'phablet';
    }
    @media only screen and (min-width: ${breakpoint.tablet}px) {
      content: 'tablet';
    }
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      content: 'laptop';
    }
    @media only screen and (min-width: ${breakpoint.laptopXL}px) {
      content: 'laptopXL';
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      content: 'desktop';
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
