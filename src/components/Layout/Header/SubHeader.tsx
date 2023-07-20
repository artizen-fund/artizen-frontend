import { useContext } from 'react'
import styled from 'styled-components'
import { rgba, useGnosis, SeasonSubcriptionContext, useDateHelpers } from '@lib'
import { typography, palette, breakpoint } from '@theme'
import { Glyph, Icon, Countdown } from '@components'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_SEASONS } from '@gql'
import { ISubscribeSeasonsSubscription, ISubmissionFragment } from '@types'
import SubHeaderLastSeason from './SubHeaderLastSeason'

interface ISubHeader {
  visible: boolean
}

/* NOTE: 
    This lists the top donator to _all_ projects.
    ex. if @andy buys five artifacts each in five submission, they're marked as buying 25.
    If we want to change that to "largest contributor to any single submission," change the map/reducer below.
*/

const SubHeader = ({ visible }: ISubHeader) => {
  const { loading, season, arrangedSeasonList, seasonIsActive, totalPrizePooled } = useContext(SeasonSubcriptionContext)
  // const { artizenPrizeAmountETH, artizenPrizeAmountUSD } = useGnosis()

  if (!seasonIsActive) {
    return <SubHeaderLastSeason visible={visible} />
  }

  return (
    <>
      <Wrapper visible={visible}>
        <Content>
          <Title>
            <Icon glyph="crown" level={2} />
            <div>Buy Artifacts to unlock match funds</div>
          </Title>

          {!loading && (
            <Stats>
              <Stat>
                <Label>Prize funds</Label>
                <Data>
                  Ξ {totalPrizePooled}
                  {/* <CashTrend>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                      totalPrizePooled ? totalPrizePooled : 0,
                    )}
                    <Glyph glyph="trend" level={2} color="moss" darkColor="moss" />
                  </CashTrend> */}
                </Data>
              </Stat>
              <Stat>
                <Label>Cycle</Label>
                <Data>Season {season?.index}</Data>
              </Stat>
              <Stat>
                <Label>Ends in</Label>
                {/* TODO: Count down does not work */}
                {!loading && season?.endingDate && (
                  <Data>
                    <Countdown date={season?.endingDate} />
                  </Data>
                )}
              </Stat>
              <Stat>
                <Label>Current leader</Label>
                <Data>
                  {arrangedSeasonList && arrangedSeasonList.length > 0 && arrangedSeasonList[0].project?.title}
                </Data>
              </Stat>
            </Stats>
          )}
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
  display: none;
  position: fixed;
  z-index: 102;
  height: 64px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: block;
    height: 72px;
    transform: translateY(${props => (props.visible ? 0 : -100)}px);
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 88px;
  }
  width: 100%;
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
