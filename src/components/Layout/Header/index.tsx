import { useState, useContext, useRef } from 'react'
import Link from 'next/link'
import { useReactiveVar } from '@apollo/client'
import styled from 'styled-components'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Button, Logo, Modals, CuratorCheck } from '@components'
import AccountButton from './AccountButton'
import SubHeader from './SubHeader'
import SessionShelf from './SessionShelf'
import HowItWorks from './HowItWorks'
import Shelf from './Shelf'
import { breakpoint, palette } from '@theme'
import { rgba, LayoutContext, isProd, loggedInUserVar } from '@lib'
import { useRouter } from 'next/router'

const Header = () => {
  const { pathname, push } = useRouter()
  const trigger = useRef<HTMLDivElement>(null)

  const loggedInUser = useReactiveVar(loggedInUserVar)

  const { visibleShelf, toggleShelf } = useContext(LayoutContext)
  const [visible, setVisible] = useState(true)
  const headerFlipPoint = pathname === '/' && typeof window !== 'undefined' ? window.innerHeight : 10
  useScrollPosition(({ currPos }) => setVisible(currPos.y < headerFlipPoint), [], undefined, true, 50)

  return (
    <>
      <Trigger ref={trigger} />
      <Wrapper {...{ visible }} className={visibleShelf ? 'visibleShelf' : ''}>
        <Items>
          <Link href={`/`}>
            <Logo />
          </Link>
          <MobileNavButton onClick={() => toggleShelf('howItWorks')} outline level={1}>
            Menu
          </MobileNavButton>
        </Items>
        <Items>
          <Nav>
            <ul>
              {loggedInUser?.curators && loggedInUser.curators.length > 0 && (
                <li onClick={() => push('/admin/')}>Admin</li>
              )}

              <li onClick={() => toggleShelf('howItWorks')}>How It Works</li>
            </ul>
          </Nav>
          <AccountButton id="accountButton" active={visibleShelf === 'session'} />
        </Items>
      </Wrapper>
      <Shelf shelfKey="session" shadowVisible={true}>
        <SessionShelf hideShelf={() => toggleShelf()} />
      </Shelf>
      <Shelf shelfKey="howItWorks" shadowVisible={true}>
        <HowItWorks />
      </Shelf>
      <SubHeader visible={!visible} />
      <DebugTool production={isProd()} />
      <Modals />
    </>
  )
}

const Wrapper = styled.header<{ visible: boolean }>`
  position: fixed;
  z-index: 103;
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
    transform: translateY(${props => (props.visible ? 0 : -100)}px);
    height: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 88px;
  }
  @media only screen and (min-width: 1680px) {
    padding: 0 calc((100vw - 1600px) / 2);
  }

  background: ${props => rgba(palette.white, props.visible ? 0.98 : 1)};
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.48));
  @media (prefers-color-scheme: dark) {
    background: ${props => rgba(palette.slate, 0.98)};
    filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.48));
  }

  transition: transform 0.3s ease-in-out;
`

const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    gap: 24px;
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

const Trigger = styled.div`
  position: absolute;
  top: 95vh;
  width: 1px;
  height: 1px;
`

export default Header
