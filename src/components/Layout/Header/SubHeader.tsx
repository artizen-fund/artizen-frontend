import styled from 'styled-components'
import { rgba, useGnosis, assert } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { Glyph, Icon, Countdown } from '@components'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_SEASONS, SUBSCRIBE_LEADERBOARD } from '@gql'
import { ISubscribeSeasonsSubscription, ILeaderboardSubscription } from '@types'

interface ISubHeader {
  visible: boolean
}

/* NOTE: 
    This lists the top donator to _all_ projects.
    ex. if @andy buys five artifacts each in five submission, they're marked as buying 25.
    If we want to change that to "largest contributor to any single submission," change the map/reducer below.
*/

const SubHeader = ({ visible }: ISubHeader) => {
  const { safeBalanceETH, safeBalanceUSD } = useGnosis()

  const CURRENT_SEASON = assert(process.env.NEXT_PUBLIC_CURRENT_SEASON, 'NEXT_PUBLIC_CURRENT_SEASON')

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

  const { data: leaderboard } = useSubscription<ILeaderboardSubscription>(SUBSCRIBE_LEADERBOARD, {
    fetchPolicy: 'no-cache',
    variables: {
      where: { openEditionCopies: { artifact: { submissions: { season: { index: { _eq: CURRENT_SEASON } } } } } },
    },
  })

  const consolidatedLeaderboard = leaderboard?.Users.map((user, i) => {
    return {
      artizenHandle: user.artizenHandle,
      profileImage: user.profileImage,
      rank: user.openEditionCopies.reduce((x, copy) => x + copy.copies! * copy.value!, 0) || 0,
    }
  }).sort((u1, u2) => u2.rank - u1.rank)

  return (
    <>
      <Wrapper visible={visible}>
        <Content>
          <Title>
            <Icon glyph="crown" level={2} />
            <div>Buy Artifacts to fund projects</div>
          </Title>

          <Stats>
            <Stat>
              <Label>Prize funds</Label>
              <Data>
                Ξ {safeBalanceETH}
                <CashTrend>
                  ${safeBalanceUSD}
                  <Glyph glyph="trend" level={2} color="moss" darkColor="moss" />
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
            {typeof consolidatedLeaderboard === 'object' && consolidatedLeaderboard.length > 0 && (
              <Stat>
                <Label>Current leader</Label>
                <Data>@{consolidatedLeaderboard?.[0].artizenHandle}</Data>
              </Stat>
            )}
          </Stats>
        </Content>
      </Wrapper>
    </>
  )
}

const CashTrend = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;

  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const Wrapper = styled.header<{ visible: boolean }>`
  position: fixed;
  z-index: 102;

  height: 64px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 72px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 88px;
  }
  width: 100%;

  transform: translateY(${props => (props.visible ? 0 : -100)}px);

  left: 0;
  background: ${props => rgba(palette.white, props.visible ? 0.98 : 1)};
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.48));
  @media (prefers-color-scheme: dark) {
    background: ${props => rgba(palette.slate, 0.98)};
    filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.48));
  }

  border-bottom: 0.5px solid transparent;
  transition: transform 0.3s ease-in-out;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h2`
  grid-area: title;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${typography.label.l0}
  gap: 16px;
  > div:nth-child(1) {
    width: auto;
  }
`

const Stats = styled.div`
  grid-area: stats;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 60px;
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

export default SubHeader
