import styled from 'styled-components'
import Countdown from './Countdown'
import Leaderboard from './Leaderboard'
import Perks from './Perks'
import { Icon, ProgressBar, Button, StickyContent } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'

const Sidebar = () => {
  // note: this is just some placeholder nonsense, not final var names
  const FUND_COUNT = 3.2
  const FUND_AMOUNT = 15250
  const FUND_GOAL = 25000
  const FUND_DATE = `May, 2022`
  const FUND_DEADLINE = '2022-06-30T00:00:00'
  const leaderboard = [
    { name: 'herp derp', amount: 69 },
    { name: 'dorp donk', amount: 68 },
    { name: 'hoop doop', amount: 67 },
  ]

  return (
    <Wrapper>
      <Header>
        Join our <strong>{FUND_DATE}</strong> donation drive
      </Header>
      <Content>
        <AmountRaised>
          <span>${FUND_AMOUNT.toLocaleString()}</span> raised of ${FUND_GOAL.toLocaleString('en-US')} goal
        </AmountRaised>
        <ProgressBar>{FUND_AMOUNT / FUND_GOAL}</ProgressBar>
        <Row>
          <Countdown date={FUND_DEADLINE} />
          <DonationCount>
            <Icon>trend</Icon>
            <span>{FUND_COUNT}k donations</span>
          </DonationCount>
        </Row>
        <Row>
          <Button onClick={() => console.log('donate!')} size="l1">
            Donate Now
          </Button>
          <Button onClick={() => console.log('share!')} size="l1" outline>
            Share
          </Button>
        </Row>
        <Leaderboard {...{ leaderboard }} />
        <Perks />
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled(props => <StickyContent {...props} />)`
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.slate)};
    border-bottom: 1px solid rgba(114, 124, 140, 0.12);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  }
  border-radius: 16px;

  display: none;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: block;
    width: 390px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 500px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px 32px 32px 32px;
  gap: 32px;
  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 32px 40px 40px 40px;
    gap: 40px;
  }
  > * {
    width: 100%;
  }
`

const AmountRaised = styled.div`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
  span {
    ${typography.title.l3}
    color: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon)};
    }
  }
`

const DonationCount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  @media only screen and (min-width: ${breakpoint.desktop}) {
    gap: 16px;
  }
`

const Header = styled.h3`
  padding: 19px 32px 0px 32px;
  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 26px 40px 0px 40px;
  }
  ${typography.label.l1}
  font-weight: 500;
  strong {
    font-weight: 600;
  }
`

export default Sidebar
