import { useState } from 'react'
import styled from 'styled-components'
import { Button, Table, TableCell, TableAvatar, Spinner } from '@components'
import { aggregateDonators, rgba, assertFloat, useGnosis } from '@lib'
import { IOpenEditionsSubscription } from '@types'
import { palette } from '@theme'

interface ILeaderboard {
  openEditions?: IOpenEditionsSubscription
}

const DEFAULT_LIMIT = 3
const FIXED_PRECISION = 2

const Leaderboard = ({ openEditions }: ILeaderboard) => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT)

  const { USDtoETH } = useGnosis()

  if (!openEditions) return <Spinner minHeight="65px" />

  const count = openEditions?.OpenEditionCopies.reduce((x, edition) => x + edition.copies!, 0) || 0

  const sideItem =
    aggregateDonators(openEditions).length < DEFAULT_LIMIT ? (
      <></>
    ) : (
      <Button outline level={2} onClick={() => setLimit(limit === DEFAULT_LIMIT ? 9999 : DEFAULT_LIMIT)}>
        {limit === DEFAULT_LIMIT ? 'See All' : 'See Less'}
      </Button>
    )

  const BASE_ARTIFACT_PRICE = assertFloat(
    process.env.NEXT_PUBLIC_BASE_ARTIFACT_PRICE,
    'NEXT_PUBLIC_BASE_ARTIFACT_PRICE',
  )

  const title = (
    <div>
      Ξ{(count * BASE_ARTIFACT_PRICE).toFixed(FIXED_PRECISION)}
      <Grey>
        {' '}
        {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
          (count * BASE_ARTIFACT_PRICE) / USDtoETH!,
        )}{' '}
        in Artifact sales
      </Grey>
    </div>
  )

  return (
    <StyledTable title={title} {...{ sideItem }}>
      <SubmissionsMarker id="submissionsMarker" />
      {aggregateDonators(openEditions).map((user, index) => (
        <StyledTableCell key={`donating-user-${index}`} highlight hidden={index > limit - 1}>
          <div>
            <TableAvatar profileImage={user.profileImage} />
            <Name>{user?.artizenHandle}</Name>
          </div>
          <Amount>
            <span>owns</span> {user.copies}
          </Amount>
        </StyledTableCell>
      ))}
    </StyledTable>
  )
}

const SubmissionsMarker = styled.div`
  position: absolute;
  top: -80px;
  width: 1px;
  height: 1px;
`

const Grey = styled.span`
  color: ${rgba(palette.barracuda)};
`

const StyledTable = styled(props => <Table {...props} />)`
  position: relative;
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
  span {
    color: ${rgba(palette.barracuda)};
  }
`

export default Leaderboard
