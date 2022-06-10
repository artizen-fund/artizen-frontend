import styled from 'styled-components'
import { Button, Table, TableCell } from '@components'

export interface LeaderboardProps {
  leaderboard: Array<{ name: string; amount: number }>
}

const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  const sideItem = (
    <Button onClick={() => console.error('do something')} outline level={2}>
      See All
    </Button>
  )
  return (
    <Table title="Leaderboard" {...{ sideItem }}>
      {leaderboard.map((benefactor, index) => (
        <TableCell key={`benefactor-${index}`}>
          <div>
            <div>#{index}</div>
            <Name king={index === 0}>{benefactor.name}</Name>
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
