import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Table, TableCell, TableAvatar, Spinner } from '@components'
import { useSubscription } from '@apollo/client'
import { reduceWithPrecision } from '@lib'
import { IDonationsSubscription, IUserWithDonationFragment } from '@types'
import { SUBSCRIBE_DONATIONS } from '@gql'
// import truncateEthAddress from 'truncate-eth-address'

interface ILeaderboard {
  limit?: number
  grantId: string
  setAmountRaised: (n: number) => void
}

const DEFAULT_LIMIT = 3

const Leaderboard = ({ grantId, setAmountRaised }: ILeaderboard) => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT)

  /* TODO: 
    We would like to _not_ be loading 10,000 records (although that many donations would be a "good problem"
    We should probably be doing a more complex GraphQL query, some sort of "SELECT SUM(amount) FROM donations LEFT OUTER JOIN..."
    ... but Eric doesn't know how to do that in GraphQL.
  */
  const { loading, error, data } = useSubscription<IDonationsSubscription>(SUBSCRIBE_DONATIONS, {
    fetchPolicy: 'no-cache',
    variables: {
      limit: 9999,
      whereDonations: {
        _and: [
          {
            grantId: {
              _eq: grantId,
            },
            status: {
              _eq: 'confirmed',
            },
          },
        ],
      },
      where: {
        _and: [
          {
            hideFromLeaderboard: {
              _neq: true,
            },
          },
          {
            donations: {
              _and: [
                {
                  grantId: {
                    _eq: grantId,
                  },
                  status: {
                    _eq: 'confirmed',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  if (error) {
    console.error('error donation subscription', error)
  }

  const [donatingUsers, setDonatingUsers] = useState<Array<IUserWithDonationFragment & { aggregateDonation: number }>>()
  useEffect(() => {
    if (!data) return
    const usersWithAggregate = data.Users.map(u => {
      const aggregateDonation = reduceWithPrecision(u.donations.map(d => d.amount))((a: number, b: number) => a + b)
      return { ...u, aggregateDonation }
    })
    setDonatingUsers(usersWithAggregate)
    if (usersWithAggregate.length > 0) {
      setAmountRaised(
        reduceWithPrecision(usersWithAggregate.map(d => d.aggregateDonation))((a: number, b: number) => a + b),
      )
    }
  }, [data])

  const sideItem = (
    <Button outline level={2} onClick={() => setLimit(limit === DEFAULT_LIMIT ? 9999 : DEFAULT_LIMIT)}>
      {limit === DEFAULT_LIMIT ? 'See All' : 'See Less'}
    </Button>
  )

  return !donatingUsers ? (
    <Spinner minHeight="65px" />
  ) : (
    <StyledTable title="Leaderboard" {...{ sideItem }}>
      {donatingUsers
        .sort((a, b) => (a.aggregateDonation > b.aggregateDonation ? -1 : 1))
        .map((user, index) => (
          <StyledTableCell key={`donating-user-${index}`} highlight hidden={index > limit - 1}>
            <div>
              <TableAvatar profileImage={user.profileImage} />
              <Name>{user?.artizenHandle}</Name>
            </div>
            <Amount>{user.aggregateDonation} ETH</Amount>
          </StyledTableCell>
        ))}
    </StyledTable>
  )
}

const StyledTable = styled(props => <Table {...props} />)`
  margin-top: 24px;
`

const StyledTableCell = styled(props => <TableCell {...props} />)<{ hidden: boolean }>`
  display: ${props => (props.hidden ? 'none' : 'flex')};
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
