import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button } from '@components'
import AccountButton from './AccountButton'
import { breakpoint, palette, iconKey } from '@theme'
import { rgba } from '@lib'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  useScrollPosition(({ currPos }) => setScrolled(currPos.y > 0), [], undefined, true, 50)
  return (
    <Wrapper {...{ scrolled }}>
      <Items>
        <Link href="/">
          <a>
            <Logo>Artizen</Logo>
          </a>
        </Link>
        <MobileNavButton onClick={() => console.log('derp')} icon={iconKey.arrow} iconOnRight outline size="l1">
          Menu
        </MobileNavButton>
      </Items>
      <Items>
        <Nav>
          <ul>
            <li>
              <Link href="/">Leaderboard</Link>
            </li>
            <li>
              <Link href="/">How it Works</Link>
            </li>
          </ul>
        </Nav>
        <Button href="/" icon={iconKey.donate} size="l1">
          Donate
        </Button>
        <AccountButton />
      </Items>
    </Wrapper>
  )
}

const Wrapper = styled.header<{ scrolled: boolean }>`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 64px;
  padding: 0 40px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 88px;
  }

  background: ${props => rgba(palette.white, props.scrolled ? 0.92 : 1)};
  @media (prefers-color-scheme: dark) {
    background: ${props => rgba(palette.slate, props.scrolled ? 0.92 : 1)};
  }

  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, ${props => (props.scrolled ? 0.48 : 0)}));
  backdrop-filter: blur(${props => (props.scrolled ? 16 : 0)}px);
  transition: background-color 0.3s ease-in-out, filter 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out;
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
  }
`

const MobileNavButton = styled(props => <Button {...props} />)`
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    display: none !important;
  }
`

export default Header
