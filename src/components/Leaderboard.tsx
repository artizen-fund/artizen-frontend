import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Table, TableCell, TableAvatar, Spinner } from '@components'
import { useGnosis, aggregateDonators } from '@lib'
import { IOpenEditionsSubscription } from '@types'
// import truncateEthAddress from 'truncate-eth-address'

interface ILeaderboard {
  openEditions?: IOpenEditionsSubscription
}

const DEFAULT_LIMIT = 3

const Leaderboard = ({ openEditions }: ILeaderboard) => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT)

  const [amountRaised, setAmountRaised] = useState<number>(0)

  useEffect(() => {
    if (!openEditions?.OpenEditionCopies) return
    setAmountRaised(openEditions.OpenEditionCopies.map(o => o.value * (o.copies || 0))?.reduce((x, y) => x + y, 0))
  }, [openEditions])

  if (!openEditions) return <Spinner minHeight="65px" />

  const sideItem =
    aggregateDonators(openEditions).length < DEFAULT_LIMIT ? (
      <></>
    ) : (
      <Button outline level={2} onClick={() => setLimit(limit === DEFAULT_LIMIT ? 9999 : DEFAULT_LIMIT)}>
        {limit === DEFAULT_LIMIT ? 'See All' : 'See Less'}
      </Button>
    )

  return (
    <StyledTable title={`Ξ${amountRaised} $xxx in Artifact sales`} {...{ sideItem }}>
      {aggregateDonators(openEditions).map((user, index) => (
        <StyledTableCell key={`donating-user-${index}`} highlight hidden={index > limit - 1}>
          <div>
            <TableAvatar profileImage={user.profileImage} />
            <Name>{user?.artizenHandle}</Name>
          </div>
          <Amount>minted {user.copies}</Amount>
        </StyledTableCell>
      ))}
    </StyledTable>
  )
}

const StyledTable = styled(props => <Table {...props} />)`
  margin: 24px 0;
`

const StyledTableCell = styled(props => <TableCell {...props} />)<{ hidden: boolean }>`
  &&& {
    display: ${props => (props.hidden ? 'none' : 'flex')};
  }
`

const Name = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  span {
    line-height: 1em;
  }
`

const Amount = styled.div`
  white-space: nowrap;
`

export default Leaderboard
