import styled from 'styled-components'
import { rgba, assetPath } from '@lib'
import { typography, palette } from '@theme'

const LeaderboardHeader = () => (
  <Wrapper>
    <Copy>
      <Title>Leaderboard</Title>
      <Stats>
        <Stat>
          <Label>Artizen Award</Label>
          <Data>Ξ 23</Data>
        </Stat>
        <Stat>
          <Label>Cycle</Label>
          <Data>Season 2</Data>
        </Stat>
        <Stat>
          <Label>Ends in</Label>
          <Data>13d : 8h : 44m</Data>
        </Stat>
      </Stats>
    </Copy>
    <OfficialSelection src={assetPath('/assets/officialSelection.svg')} />
  </Wrapper>
)

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const Copy = styled.div``

const Title = styled.h2`
  ${typography.title.l2}
  margin-bottom: 32px;
`

const Stats = styled.div`
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
  ${typography.title.l4}
`

const OfficialSelection = styled.img``

export default LeaderboardHeader
