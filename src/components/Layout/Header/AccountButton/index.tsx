import { useEffect, useContext } from 'react'
import { useApolloClient } from '@apollo/client'
import styled from 'styled-components'
import { Glyph } from '@components'
import { breakpoint, palette } from '@theme'
import { rgba, refreshSession, UserContext, isClient } from '@lib'

const AccountButton = (props: SimpleComponentProps) => {
  const apolloClient = useApolloClient()
  const { loggedInUser } = useContext(UserContext)

  useEffect(() => {
    if (isClient()) refreshSession(apolloClient)
  }, [])

  const TEMP_INITIALS = 'RP'

  // TODO: this component has two states, loggedIn: true or false
  // There's actually three…
  // SessionShelf visible "close X"
  // SessionShelf hidden and logged out "sign in"
  // SessionShelf hidden and logged in "avatar or initials view"

  return (
    <Wrapper loggedIn={!!loggedInUser} {...props}>
      <SignInLabel loggedIn={!!loggedInUser} />
      <HamburgerGlyph loggedIn={!!loggedInUser} color="night" darkColor="moon" glyph="hamburger" />
      <AvatarImage loggedIn={!!loggedInUser}>
        <Initials>{TEMP_INITIALS}</Initials>
      </AvatarImage>
    </Wrapper>
  )
}

interface LoginState {
  loggedIn: boolean
}

const Wrapper = styled.div<LoginState>`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 4px;
  width: ${props => (props.loggedIn ? 72 : 85)}px;
  height: 40px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 6px;
    width: ${props => (props.loggedIn ? 84 : 99)}px;
    height: 48px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 8px;
    width: ${props => (props.loggedIn ? 96 : 119)}px;
    height: 56px;
  }

  border: 0.5px solid ${rgba(palette.stone)};
  @media (prefers-color-scheme: dark) {
    border: 0.5px solid ${rgba(palette.barracuda)};
  }
  box-sizing: border-box;
  border-radius: 9999px;

  cursor: pointer;
  transition: width 0.3s ease-in-out;
`

const SignInLabel = styled.div<LoginState>`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:after {
    content: 'Sign in';
    font-style: normal;
    font-size: 13px;
    line-height: 100%;
  }

  opacity: ${props => (props.loggedIn ? 0 : 1)};
  transition: opacity 0.15s ease-in-out;
  pointer-events: none;
`

const HamburgerGlyph = styled(props => <Glyph {...props} />)<LoginState>`
  width: 32px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 36px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 40px;
  }

  opacity: ${props => (props.loggedIn ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`

const AvatarImage = styled.div<LoginState>`
  display: flex;
  align-items: center;
  border-radius: 9999px;

  width: 32px;
  height: 32px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 36px;
    height: 36px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 40px;
    height: 40px;
  }

  text-align: center;

  color: ${rgba(palette.night)};
  background-color: ${rgba(palette.stone)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
    background-color: ${rgba(palette.barracuda)};
  }

  opacity: ${props => (props.loggedIn ? 1 : 0)};
  transform: scale(${props => (props.loggedIn ? 1 : 0)});
  transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
`

const Initials = styled.div`
  width: 100%;

  font-style: normal;
  text-align: center;

  font-size: 13px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    font-size: 15px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    font-size: 16px;
  }
`

export default AccountButton
