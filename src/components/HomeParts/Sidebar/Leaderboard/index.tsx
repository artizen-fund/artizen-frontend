import styled from 'styled-components'
import { Button, Table, TableCell } from '@components'

export interface LeaderboardProps {
  leaderboard: Array<{ name: string; amount: number }>
}

const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  const sideItem = (
    <Button onClick={() => console.log('do something')} outline size="l2">
      See All
    </Button>
  )
  return (
    <Table title="Leaderboard" {...{ sideItem }}>
      {leaderboard.map((benefactor, i) => (
        <TableCell key={`benefactor-${i}`}>
          <div>
            <div>#{i}</div>
            <Name king={i === 0}>{benefactor.name}</Name>
          </div>
          <div>${benefactor.amount.toLocaleString()}</div>
        </TableCell>
      ))}
    </Table>
  )
}

const Name = styled.div<{ king: boolean }>`
  position: relative;
  ${props =>
    props.king &&
    `
  &:after {
    content: ' 👑';
    position: absolute;
    right: -30px;
    top: -6px;
  }
`}
`

export default Leaderboard
