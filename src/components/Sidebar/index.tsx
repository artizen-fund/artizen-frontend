import styled from 'styled-components'
import Leaderboard from './Leaderboard'
import Perks from './Perks'
import Countdown from './Countdown'
import { Glyph, ProgressBar, Button, StickyContent, StickyCanvas } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { formatUSDC, rgba } from '@lib'
import { ISidebarDonatorsQuery } from '@types'

export type ISidebar = Pick<ISidebarDonatorsQuery, 'onChainDonations'> & {
  FUND_COUNT: number
  FUND_AMOUNT: number
  FUND_GOAL: number
  FUND_DATE: string
  FUND_DEADLINE: string
}

const Sidebar = ({ onChainDonations, FUND_COUNT, FUND_AMOUNT, FUND_GOAL, FUND_DATE, FUND_DEADLINE }: ISidebar) => {
  return (
    <StyledStickyCanvas>
      <Wrapper>
        <Header>
          Join our <strong>{FUND_DATE}</strong> donation drive
        </Header>
        <Content>
          <FundBlock>
            {onChainDonations && onChainDonations.donations.length > 0 && (
              <AmountRaised>
                <span>${formatUSDC(onChainDonations.donations[0].totalDonations)}</span> raised of $
                {FUND_GOAL.toLocaleString()} goal
              </AmountRaised>
            )}
            <ProgressBar>{FUND_AMOUNT / FUND_GOAL}</ProgressBar>
            <Row>
              <Countdown date={FUND_DEADLINE} />
              <DonationCount>
                <Glyph glyph="trend" /> <span>{FUND_COUNT}k donations</span>
              </DonationCount>
            </Row>
          </FundBlock>
          <Row>
            <Button onClick={() => alert('todo: implement this')} level={1} stretch glyph="donate">
              Donate
            </Button>
            <Button onClick={() => alert('todo: implement this')} level={1} stretch outline>
              Share Now
            </Button>
          </Row>
          <LargeScreensOnly>
            <Leaderboard {...{ onChainDonations }} />
            <Perks />
          </LargeScreensOnly>
        </Content>
      </Wrapper>
    </StyledStickyCanvas>
  )
}

const StyledStickyCanvas = styled(props => <StickyCanvas {...props} />)`
  grid-area: sidebar;
`

const Wrapper = styled(props => <StickyContent {...props} />)`
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.slate)};
    border-bottom: 1px solid rgba(114, 124, 140, 0.12);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  }
  border-radius: 0px 0px 16px 16px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: 388px;
    top: 92px;
    border-radius: 16px 16px 16px 16px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    max-width: 498px;
    top: 108px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px 32px 32px 32px;
  gap: 32px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 32px 40px 40px 40px;
    gap: 40px;
  }
  > * {
    width: 100%;
  }
`

const FundBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 24px;
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
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }
`

const Header = styled.h3`
  padding: 19px 32px 0px 32px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 26px 40px 0px 40px;
  }
  ${typography.label.l1}
  font-weight: 500;
  strong {
    font-weight: 600;
  }
`

const LargeScreensOnly = styled.div`
  display: none;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: contents;
  }
`

export default Sidebar
