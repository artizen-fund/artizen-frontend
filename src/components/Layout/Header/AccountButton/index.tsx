import { useContext, useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useAccount } from 'wagmi'
import { useQuery, useApolloClient, useReactiveVar } from '@apollo/client'
import styled from 'styled-components'
import { Glyph, Spinner } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { IGetUserQuery, Maybe } from '@types'
import { rgba, loggedInUserVar, LayoutContext, textCrop } from '@lib'
import { GET_USER } from '@gql'

const AccountButton = ({ active, ...props }: SimpleComponentProps & { active: boolean }) => {
  const { isConnected } = useAccount()
  const { setVisibleModal, toggleShelf, setVisibleModalWithAttrs } = useContext(LayoutContext)
  const { data: session, status } = useSession()
  const loggedInUser = useReactiveVar(loggedInUserVar)

  if (!isConnected && !!session) {
    console.warn('user session is not connected to the wallet')
    signOut()
  }

  useQuery<IGetUserQuery>(GET_USER, {
    skip: !isConnected || !session || !session?.user?.publicAddress,
    variables: { publicAddress: session?.user?.publicAddress.toLowerCase() },
    onCompleted: data => {
      if (!loggedInUser || loggedInUser.id !== data.Users[0].id) {
        //TODO: there is really not need to use useReactiveVar. We can move this query function to a hook and use it everywhere the user data is needed
        // useReactiveVar forces rerender the whole website, bad stuff
        loggedInUserVar(data.Users[0])
      }
    },
    onError: error => {
      console.log('onError ', error)
    },
  })

  const onClick = () => {
    if (status === 'loading') {
      return
    } else if (!loggedInUser) {
      setVisibleModal('login')
    } else {
      toggleShelf('session')
    }
  }

  const [avatarDisplay, setAvatarDisplay] = useState<'avatar' | 'initials' | 'placeholder' | undefined>()

  useEffect(() => {
    setAvatarDisplay(
      !loggedInUser
        ? undefined
        : !!loggedInUser.profileImage
        ? 'avatar'
        : !!loggedInUser.artizenHandle
        ? 'initials'
        : 'placeholder',
    )
    if (status === 'authenticated' && !!loggedInUser && (!loggedInUser.email || !loggedInUser.artizenHandle)) {
      setVisibleModalWithAttrs('createProfile', {
        action: 'update',
        sendWelcomeEmail: true,
      })
    }
  }, [loggedInUser])

  return (
    <Wrapper loggedIn={!!loggedInUser} visibleShelf={active} {...{ onClick }} {...props}>
      <TextLabel visible={status === 'loading'}>
        <Spinner />
      </TextLabel>
      <TextLabel visible={status !== 'loading' && active}>
        <SizedType>Close</SizedType>
      </TextLabel>
      <TextLabel visible={status !== 'loading' && !loggedInUser && !active}>
        <SizedType>Connect</SizedType>
      </TextLabel>
      <HamburgerGlyph
        visible={status !== 'loading' && !!loggedInUser && !active}
        color="night"
        darkColor="moon"
        glyph="hamburger"
      />
      <IconWrapper active={!!loggedInUser && !active}>
        <AvatarImage active={avatarDisplay === 'avatar'} profileImage={loggedInUser?.profileImage} />
        <AvatarImage active={avatarDisplay === 'placeholder'}>
          <Glyph glyph="face" level={1} color="night" darkColor="moon" />
        </AvatarImage>
        <Initials active={avatarDisplay === 'initials'}>
          <SizedType>{loggedInUser?.artizenHandle?.substring(0, 1)}</SizedType>
        </Initials>
      </IconWrapper>
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

const TextLabel = styled.div<{ visible: boolean }>`
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

  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.15s ease-in-out;
  pointer-events: none;
`

const SizedType = styled.span`
  display: block;
  ${textCrop(typography.label.l1)}
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

const IconWrapper = styled.div<{ active: boolean }>`
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
  ${textCrop(typography.label.l1)}

  font-size: 13px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    font-size: 15px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    font-size: 16px;
  }
`

export default AccountButton
