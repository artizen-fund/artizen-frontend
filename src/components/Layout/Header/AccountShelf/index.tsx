import styled from 'styled-components'
import { Button } from '@components'
import { breakpoint, typography, palette } from '@theme'
import { rgba, logoutUser } from '@lib'
import AccountStats from './AccountStats'

interface IAccountShelf {
  user: any
}

const AccountShelf = ({ user }: IAccountShelf) => {
  const stats = [
    {
      glyph: 'donate',
      unit: '$800',
      label: 'donated',
    },
    {
      glyph: 'info',
      unit: '42',
      label: 'collected',
    },
    {
      glyph: 'info',
      unit: '$0',
      label: 'collected',
    },
    {
      glyph: 'info',
      unit: '100',
      label: '$ART',
    },
  ]

  return (
    <Wrapper>
      <Commands>
        {user.firstName && <Welcome>Hi {user.firstName}</Welcome>}
        {!user.firstName && <Welcome>Welcome</Welcome>}
        <Message>Thanks for supporting the future of public goods.</Message>
        <Buttons>
          <Button onClick={() => alert('I do nothing!')} stretch outline level={1} glyph="face">
            Profile
          </Button>
          <Button onClick={() => alert('I do nothing!')} stretch outline level={1} glyph="info">
            Wallet
          </Button>
          <Button onClick={() => alert('I do nothing!')} stretch outline level={1} glyph="info">
            Settings
          </Button>
          <Button onClick={() => alert('I do nothing!')} stretch outline level={1} glyph="info">
            Notifications
          </Button>
        </Buttons>
        <hr />
        <div onClick={() => logoutUser()}>Sign Out</div>
      </Commands>
      <AccountStats {...{ stats }} />
      <Illustration src="/images/qf-square.svg" />
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

const Illustration = styled.img`
  grid-area: illustration;
  margin: auto;
`

export default AccountShelf
