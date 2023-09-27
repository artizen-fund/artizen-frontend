import styled from 'styled-components'
import { rgba, assetPath, formatDate } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { PagePadding, Countdown, Glyph } from '@components'

interface LeaderboardHeaderProps {
  index?: number
  endingDate?: Partial<any>
  loading?: boolean
  totalPrizePooled?: number
  seasonIsActive?: boolean
}

const LeaderboardHeader = ({
  seasonIsActive,
  loading,
  index,
  endingDate,
  totalPrizePooled,
}: LeaderboardHeaderProps): JSX.Element => {
  return (
    <StyledPagePadding>
      <Content>
        <Title>Top Artifacts</Title>

        <Stats>
          <Stat>
            <Label>{seasonIsActive ? 'Match Funds' : 'Funds Awarded'}</Label>
            {!!loading && <Data>…</Data>}
            {!loading && <Data>{totalPrizePooled} ETH</Data>}
            {/* {!loading && (
              <Data>
                {artizenPrizeAmountETH} ETH
                <CashTrend>
                  {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                    parseFloat(artizenPrizeAmountUSD || '0'),
                  )}
                  <Glyph glyph="trend" level={2} color="barracuda" darkColor="stone" />
                </CashTrend>
              </Data>
            )} */}
          </Stat>
          <Stat>
            <Label>Cycle</Label>
            {!!loading && <Data>…</Data>}
            {!loading && <Data>Season {index}</Data>}
          </Stat>
          {seasonIsActive && (
            <Stat>
              <Label>Ends in</Label>
              {!!loading && <Data>…</Data>}
              {!loading && !!endingDate && (
                <Data>
                  <Countdown date={endingDate} />
                </Data>
              )}
            </Stat>
          )}
          {!seasonIsActive && endingDate && (
            <Stat>
              <Label>Ended on</Label>
              <Data>{formatDate(new Date(endingDate as any))}</Data>
            </Stat>
          )}
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
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    padding: 50px 0;
  }
`

const Content = styled.div`
  display: grid;
  grid-template-areas: 'title laurels' 'stats stats';
  grid-template-rows: repeat(2, 1fr);
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
  max-width: 140px;
  img {
    width: 100%;
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    max-width: none;
    img {
      max-width: 300px;
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
  @media only screen and (min-width: 744px) {
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
