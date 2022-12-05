import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useReactiveVar } from '@apollo/client'
import styled from 'styled-components'
import { Glyph } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { Maybe } from '@types'
import { rgba, loggedInUserVar } from '@lib'

const AccountButton = ({ active, ...props }: SimpleComponentProps & { active: boolean }) => {
  const loggedInUser = useReactiveVar(loggedInUserVar)

  const [avatarDisplay, setAvatarDisplay] = useState<'avatar' | 'initials' | 'placeholder' | undefined>()
  useEffect(() => {
    setAvatarDisplay(
      !loggedInUser
        ? undefined
        : !!loggedInUser.profileImage
        ? 'avatar'
        : !!loggedInUser.firstName && !!loggedInUser.lastName
        ? 'initials'
        : 'placeholder',
    )
  }, [loggedInUser])

  return (
    <Wrapper loggedIn={!!loggedInUser} visibleShelf={active} {...props}>
      <CloseLabel id="close-bt" visible={active}>
        Close
      </CloseLabel>
      <SignInLabel id="signin-bt" visible={!loggedInUser && !active}>
        Sign In
      </SignInLabel>
      <HamburgerGlyph visible={!!loggedInUser && !active} color="night" darkColor="moon" glyph="hamburger" />
      <AvatarWrapper active={!!loggedInUser && !active}>
        <AvatarImage active={avatarDisplay === 'avatar'} profileImage={loggedInUser?.profileImage} />
        <AvatarImage active={avatarDisplay === 'placeholder'}>
          <Glyph glyph="face" level={1} color="night" darkColor="moon" />
        </AvatarImage>
        <Initials active={avatarDisplay === 'initials'}>
          {loggedInUser?.firstName?.substring(0, 1)}
          {loggedInUser?.lastName?.substring(0, 1)}
        </Initials>
      </AvatarWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ loggedIn: boolean; visibleShelf: boolean }>`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 4px;
  width: ${props => (!props.loggedIn && props.visibleShelf ? 95 : props.loggedIn ? 72 : 85)}px;
  height: 40px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 6px;
    width: ${props => (!props.loggedIn && props.visibleShelf ? 114 : props.loggedIn ? 84 : 99)}px;
    height: 48px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 8px;
    width: ${props => (!props.loggedIn && props.visibleShelf ? 141 : props.loggedIn ? 96 : 119)}px;
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

const SignInLabel = styled.div<{ visible: boolean }>`
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

  ${typography.label.l1}

  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.15s ease-in-out;
  pointer-events: none;
`

const CloseLabel = styled.div<{ visible: boolean }>`
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

  ${typography.label.l1}
  padding-top: 2px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding-top: 2.5px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding-top: 3.5px;
  }

  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.15s ease-in-out;
  pointer-events: none;
`

const HamburgerGlyph = styled(props => <Glyph {...props} />)<{ visible: boolean }>`
  width: 32px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 36px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 40px;
  }

  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`

const AvatarWrapper = styled.div<{ active: boolean }>`
  position: relative;
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
  opacity: ${props => (props.active ? 1 : 0)};
  transform: scale(${props => (props.active ? 1 : 0)});
  transition: opacity 0.3s ease-in-out, transform 0.5s ease-in-out;
`

const AvatarImage = styled.div<{ active: boolean; profileImage?: Maybe<string> }>`
  position: absolute;
  display: ${props => (props.active ? 'flex' : 'none')};
  justify-content: center;
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
  background-image: url(${props => props.profileImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
    background-color: ${rgba(palette.barracuda)};
  }
`

const Initials = styled.div<{ active: boolean }>`
  position: absolute;
  display: ${props => (props.active ? 'flex' : 'none')};
  justify-content: center;
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

  font-size: 13px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    font-size: 15px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    font-size: 16px;
  }
`

export default AccountButton
