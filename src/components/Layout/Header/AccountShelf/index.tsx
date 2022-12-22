import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button } from '@components'
import { breakpoint, typography, palette } from '@theme'
import { rgba, assetPath } from '@lib'
import { IUsers, IGetSelfQuery } from '@types'
import { useDisconnect } from 'wagmi'
import { GET_SELF } from '@gql'

interface IAccountShelf {
  user: Partial<IUsers>
  hideShelf: () => void
}

const AccountShelf = ({ hideShelf }: IAccountShelf) => {
  const { data: session, status } = useSession()
  const { data: loggedInUser } = useQuery<IGetSelfQuery>(GET_SELF, {
    variables: {
      publicAddress: session?.user?.publicAddress.toLowerCase(),
    },
  })
  const { disconnect } = useDisconnect()

  const router = useRouter()
  const goToSettings = (section: string) => {
    router.push(`/settings#${section}`)
    hideShelf()
  }

  const disconnectAndSignout = async () => {
    disconnect()
    await signOut()
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
    })
    localStorage.clear()
  }

  return !loggedInUser?.Users ? (
    <></>
  ) : (
    <Wrapper>
      <Commands>
        <Top>
          {loggedInUser.Users[0].firstName && <Welcome>Hi {loggedInUser.Users[0].firstName}</Welcome>}
          {!loggedInUser.Users[0].firstName && <Welcome>Welcome</Welcome>}
          <Message>Thanks for supporting the future of public goods.</Message>
          <Buttons>
            <Button onClick={() => goToSettings('profile')} stretch outline level={1} glyph="face">
              Profile
            </Button>
            {/*<Button onClick={() => goToSettings('wallet')} stretch outline level={1} glyph="wallet">
              Wallet
            </Button>*/}
            <Button onClick={() => goToSettings('settings')} stretch outline level={1} glyph="gear">
              Settings
            </Button>
            {/*<Button onClick={() => goToSettings('notifications')} stretch outline level={1} glyph="bell">
              Notifications
            </Button>*/}
          </Buttons>
        </Top>
        <div>
          <Rule />
          <Button onClick={() => disconnectAndSignout()} stretch level={1} glyph="power" transparent>
            Sign Out
          </Button>
        </div>
      </Commands>
      {/*<AccountStats {...{ stats }} />*/}
      <Illustration />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-template-areas: 'commands' 'illustration';
  gap: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'illustration commands';
    gap: 48px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'illustration commands';
    gap: 64px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 5vw;
  }
  @media only screen and (min-width: 1920px) {
    gap: 96px;
  }
`

const Commands = styled.div`
  grid-area: commands;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const Welcome = styled.h1`
  ${typography.title.l2}
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
`

const Message = styled.h2`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const Buttons = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  gap: 8px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }
`

const Illustration = styled.div`
  grid-area: illustration;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${assetPath('/assets/illustrations/settings/accountShelf.png')});
  @media (prefers-color-scheme: dark) {
    background-image: url(${assetPath('/assets/illustrations/settings/accountShelf-dark.png')});
  }
`

const Rule = styled.hr`
  appearance: none;
  width: 100%;
  height: 0.5px;
  background: ${rgba(palette.stone)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.barracuda, 0.64)};
  }
  border: 0;
  outline: 0;
`

export default AccountShelf
