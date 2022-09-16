import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Button } from '@components'
import { breakpoint, typography, palette } from '@theme'
import { rgba, logout } from '@lib'
import { IUser } from '@types'
import AccountStats from './AccountStats'

interface IAccountShelf {
  user: IUser
  hideShelf: () => void
}

const AccountShelf = ({ user, hideShelf }: IAccountShelf) => {
  const stats = [
    {
      glyph: 'donate',
      unit: '$800',
      label: 'donated',
    },
    {
      glyph: 'palette',
      unit: '42',
      label: 'collected',
    },
    {
      glyph: 'wallet',
      unit: '$0',
      label: 'collected',
    },
    {
      glyph: 'token',
      unit: '100',
      label: '$ART',
    },
  ]

  const router = useRouter()
  const goToSettings = (section: string) => {
    router.push(`/settings#${section}`)
    hideShelf()
  }

  return (
    <Wrapper>
      <Commands>
        <Top>
          {user.firstName && <Welcome>Hi {user.firstName}</Welcome>}
          {!user.firstName && <Welcome>Welcome</Welcome>}
          <Message>Thanks for supporting the future of public goods.</Message>
          <Buttons>
            <Button onClick={() => goToSettings('profile')} stretch outline level={1} glyph="face">
              Profile
            </Button>
            <Button onClick={() => goToSettings('wallet')} stretch outline level={1} glyph="wallet">
              Wallet
            </Button>
            <Button onClick={() => goToSettings('settings')} stretch outline level={1} glyph="gear">
              Settings
            </Button>
            <Button onClick={() => goToSettings('notifications')} stretch outline level={1} glyph="bell">
              Notifications
            </Button>
          </Buttons>
        </Top>
        <div>
          <Rule />
          <Button onClick={logout} stretch level={1} glyph="power" transparent>
            Sign Out
          </Button>
        </div>
      </Commands>
      <AccountStats {...{ stats }} />
      <Illustration src="/assets/qf-square.svg" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-template-areas: 'commands' 'illustration' 'stats';
  gap: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-rows: auto;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: 'illustration stats commands';
    gap: 48px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-rows: auto;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: 'illustration stats commands';
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

const Illustration = styled.img`
  grid-area: illustration;
  width: auto;
  max-width: 100%;
  margin: auto;
`

const Rule = styled.hr`
  appearance: none;
  width: 100%;
  height: 1px;
  background: ${rgba(palette.barracuda)};
  border: 0;
  outline: 0;
`

export default AccountShelf
