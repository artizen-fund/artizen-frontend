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
      <Illustration data="/assets/qf-square.svg" />
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
    grid-template-rows: 2;
    grid-template-columns: 2;
    grid-template-areas: 'commands commands' 'illustration stats';
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-rows: 1;
    grid-template-columns: 3;
    grid-template-areas: 'illustration stats commands';
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
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }
`

const Illustration = styled.object`
  grid-area: illustration;
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
