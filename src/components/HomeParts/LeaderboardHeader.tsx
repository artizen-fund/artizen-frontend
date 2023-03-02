import styled from 'styled-components'
import { rgba } from '@lib'
import { typography, palette } from '@theme'

const LeaderboardHeader = () => (
  <Wrapper>
    <Copy>
      <Title>Leaderboard</Title>
      <Stats>
        <Stat>
          <Label>Artizen Award</Label>
          <Data>23</Data>
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
    <OfficialSelection>Official Selection</OfficialSelection>
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
`

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const Stat = styled.div`
  position: relative;
  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background-color: ${rgba(palette.stone)};
  }
`

const Label = styled.h3`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const Data = styled.div`
  ${typography.title.l4}
`

const OfficialSelection = styled.div``

export default LeaderboardHeader
