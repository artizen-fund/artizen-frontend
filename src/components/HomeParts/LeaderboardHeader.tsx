import styled from 'styled-components'
import { rgba, assetPath, useGnosis, CURRENT_SEASON } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { PagePadding, Countdown, Glyph } from '@components'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_SEASONS } from '@gql'
import { ISubscribeSeasonsSubscription } from '@types'

const LeaderboardHeader = () => {
  const { safeBalanceETH, safeBalanceUSD } = useGnosis()

  const { data } = useSubscription<ISubscribeSeasonsSubscription>(SUBSCRIBE_SEASONS, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        index: { _eq: CURRENT_SEASON },
        // startingDate: { _lte: moment().tz(ARTIZEN_TIMEZONE).format() },
        // endingDate: { _gt: moment().tz(ARTIZEN_TIMEZONE).format() },
      },
      order_by: { submissions_aggregate: { count: 'asc' } },
    },
  })

  return (
    <StyledPagePadding>
      <Content>
        <Title>Leaderboard</Title>

        <Stats>
          <Stat>
            <Label>Prize Funds</Label>
            <Data>
              {safeBalanceETH} ETH
              <CashTrend>
                ${safeBalanceUSD}
                <Glyph glyph="trend" level={2} color="barracuda" darkColor="stone" />
              </CashTrend>
            </Data>
          </Stat>
          <Stat>
            <Label>Cycle</Label>
            <Data>Season {CURRENT_SEASON}</Data>
          </Stat>
          <Stat>
            <Label>Ends in</Label>
            <Data>
              <Countdown date={data?.Seasons[0].endingDate} />
            </Data>
          </Stat>
        </Stats>

        <OfficialSelection>
          <img src={assetPath('/assets/officialSelection.svg')} />
        </OfficialSelection>
      </Content>
    </StyledPagePadding>
  )
}

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  padding: 20px 0;
`

const Content = styled.div`
  display: grid;
  grid-template-areas: 'title laurels' 'stats stats';
  gap: 30px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-areas: 'title laurels' 'stats laurels';
  }
`

const Title = styled.h2`
  grid-area: title;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${typography.title.l2}
`

const OfficialSelection = styled.div`
  img {
    max-width: 140px;
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    img {
      max-width: none;
    }
  }
  grid-area: laurels;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  @media (prefers-color-scheme: dark) {
    filter: invert(1);
  }
`

const Stats = styled.div`
  grid-area: stats;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  justify-content: space-between;
  @media only screen and (min-width: 744px) {
    gap: 60px;
    justify-content: flex-start;
  }
`

const Stat = styled.div`
  position: relative;
  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    left: -30px;
    width: 1px;
    height: 100%;
    background-color: ${rgba(palette.stone)};
  }
  &:first-child:before {
    display: none;
  }
`

const Label = styled.h3`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const Data = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: bottom;
  gap: 16px;
  ${typography.title.l4}
`

const CashTrend = styled.div`
  @media only screen and (max-width: 733px) {
    display: none;
  }
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;

  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

export default LeaderboardHeader
