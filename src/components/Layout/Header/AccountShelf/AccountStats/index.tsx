import styled from 'styled-components'
import { Icon } from '@components'
import { typography, palette } from '@theme'
import { rgba } from '@lib'

interface IAccountStats {
  stats: Array<{
    glyph: string
    unit: string
    label: string
  }>
}

const AccountStats = ({ stats }: IAccountStats) => {
  return (
    <Stats>
      {stats.map((stat, i) => (
        <Stat key={`stat-${i}`}>
          <Icon glyph={stat.glyph} outline />
          <Unit>{stat.unit}</Unit>
          <Label>{stat.label}</Label>
        </Stat>
      ))}
    </Stats>
  )
}

const Stats = styled.ul`
  grid-area: stats;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  li:nth-of-type(1),
  li:nth-of-type(3) {
    border-right: 0.5px solid ${rgba(palette.stone)};
    @media (prefers-color-scheme: dark) {
      border-right: 0.5px solid ${rgba(palette.barracuda, 0.64)};
    }
  }

  li:nth-of-type(1),
  li:nth-of-type(2) {
    border-bottom: 0.5px solid ${rgba(palette.stone)};
    @media (prefers-color-scheme: dark) {
      border-bottom: 0.5px solid ${rgba(palette.barracuda, 0.64)};
    }
  }
`

const Stat = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Unit = styled.div`
  ${typography.title.l4}
  color: ${rgba(palette.night)};
  margin-top: 0.5em;
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
`

const Label = styled.div`
  ${typography.label.l2}
  color: ${rgba(palette.barracuda)};
`

export default AccountStats
