import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Table, TableCell, TableAvatar, Spinner } from '@components'
import { useSubscription, useReactiveVar } from '@apollo/client'
import { reduceWithPrecision, aggregateDonators, loggedInUserVar, rgba } from '@lib'
import { IOpenEditionsSubscription, IUserWithDonationFragment, IArtifactFragment } from '@types'
import { palette } from '@theme'
import { SUBSCRIBE_DONATIONS, SUBSCRIBE_OPEN_EDITIONS } from '@gql'
// import truncateEthAddress from 'truncate-eth-address'

interface ILeaderboard {
  artifact: IArtifactFragment
}

const DEFAULT_LIMIT = 3

const Leaderboard = ({ artifact }: ILeaderboard) => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT)

  const [amountRaised, setAmountRaised] = useState<number>(0)

  const { loading, error, data } = useSubscription<IOpenEditionsSubscription>(SUBSCRIBE_OPEN_EDITIONS, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        artifactId: { _eq: artifact.id },
      },
    },
  })

  if (error) {
    console.error('error retrieving open editions', error)
  }

  useEffect(() => {
    if (!data?.OpenEditionCopies) return
    setAmountRaised(data.OpenEditionCopies.map(o => o.value * (o.copies || 0))?.reduce((x, y) => x + y, 0))
  }, [data])

  if (!!loading || !data) return <Spinner minHeight="65px" />

  const sideItem =
    aggregateDonators(data).length < DEFAULT_LIMIT ? (
      <></>
    ) : (
      <Button outline level={2} onClick={() => setLimit(limit === DEFAULT_LIMIT ? 9999 : DEFAULT_LIMIT)}>
        {limit === DEFAULT_LIMIT ? 'See All' : 'See Less'}
      </Button>
    )

  return (
    <StyledTable title={`Ξ${amountRaised} $xxx in Artifact sales`} {...{ sideItem }}>
      {aggregateDonators(data).map((user, index) => (
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
  margin-top: 24px;
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
