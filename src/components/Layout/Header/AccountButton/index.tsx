import { useContext, useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useAuthRequestChallengeEvm } from '@moralisweb3/next'
import { useQuery, useApolloClient, useReactiveVar } from '@apollo/client'
import styled from 'styled-components'
import { Glyph, Spinner } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { IGetUserQuery, Maybe } from '@types'
import { rgba, textCrop } from '@lib'
import { loggedInUserVar, useCloudinary, LayoutContext } from '@lib'
import { usePrivy, useLogin } from '@privy-io/react-auth'
import { GET_USER } from '@gql'
import { getCookie } from 'cookies-next'

const AccountButton = ({ active, ...props }: SimpleComponentProps & { active: boolean }) => {
  const [messageToSign, setMessageToSign] = useState<string | null>(null)
  const { setVisibleModal, toggleShelf, setVisibleModalWithAttrs } = useContext(LayoutContext)
  const didToken = getCookie('didToken')
  const { authenticated, user } = usePrivy()
  const [loading, setLoading] = useState(false)
  // const { connectMetamask, connectOtherWallet, signEnMessage, currentFlow, isAuthenticated } = useWalletAuthFlow()
  // const { isConnected } = useAccount()

  // const { data: session, status } = useSession()
  const loggedInUser = useReactiveVar(loggedInUserVar)
  const [startAuth, setStartAuth] = useState(false)
  const { requestChallengeAsync } = useAuthRequestChallengeEvm()
  const [avatarDisplay, setAvatarDisplay] = useState<'avatar' | 'initials' | 'placeholder' | undefined>()

  // const createChallenge = async (address: `0x${string}`, chainId: string) => {
  //   const challenge = await requestChallengeAsync({ address, chainId })

  //   if (!challenge) {
  //     throw new Error('failed walletconnect challenge')
  //   }
  //   const { message } = challenge

  //   setMessageToSign(message)

  //   return message
  // }

  const { login } = useLogin({
    onComplete: async (user, isNewUser, wasAlreadyAuthenticated) => {
      console.log('wasAlreadyAuthenticated', wasAlreadyAuthenticated)
      console.log('user   ', user)
      console.log('isNewUser     ', isNewUser)
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted

      setLoading(false)
    },
    onError: error => {
      console.log(' error login  ', error)
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  })

  // console.log('user ', user)
  // console.log('authenticated', authenticated)
  // console.log('didToken in account', didToken)
  // console.log('loggedInUser   ', loggedInUser)

  // if (!isConnected && !!session) {
  //   console.warn('user session is not connected to the wallet')
  //   signOut()
  // }

  // console.log('currentFlow is should be toConnect   currentFlow === ', currentFlow)
  console.log('startAuth is should be true   startAuth === ', startAuth)

  useQuery<IGetUserQuery>(GET_USER, {
    skip: !authenticated || !didToken || loggedInUser !== undefined,
    variables: { publicAddress: user?.wallet?.address.toLowerCase() },
    onCompleted: data => {
      console.log('goes oncompleted   ', data)
      //TODO: there is really not need to use useReactiveVar. We can move this query function to a hook and use it everywhere the user data is needed
      // useReactiveVar forces rerender the whole website, bad stuff
      loggedInUserVar(data.Users[0])

      setLoading(false)
    },
    onError: error => {
      console.log('onError ', error)

      setLoading(false)
    },
  })

  const onClick = () => {
    console.log('onClick   ')

    setLoading(true)
    login()
  }

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
    if (authenticated && !!loggedInUser && (!loggedInUser.email || !loggedInUser.artizenHandle)) {
      setVisibleModalWithAttrs('createProfile', {
        action: 'update',
        sendWelcomeEmail: true,
      })
    }
  }, [loggedInUser])

  // console.log('status  ', status)
  // console.log('loggedInUser  ', loggedInUser)
  // console.log('active  ', active)

  return (
    <Wrapper
      loggedIn={false}
      visibleShelf={active}
      onClick={() => {
        if (loading) {
          return
        } else if (!loggedInUser) {
          console.log('onClick')
          onClick()
        } else {
          console.log('toggleShelf')
          toggleShelf('session')
        }
      }}
      {...props}
    >
      <TextLabel visible={loading}>
        <Spinner />
      </TextLabel>
      <TextLabel visible={!loading && active}>
        <SizedType>Close</SizedType>
      </TextLabel>
      <TextLabel visible={!loading && !loggedInUser}>
        <SizedType>Connect</SizedType>
      </TextLabel>
      <HamburgerGlyph
        visible={!loading && !!loggedInUser && !active}
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
