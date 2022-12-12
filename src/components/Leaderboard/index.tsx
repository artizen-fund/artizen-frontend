import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Table, TableCell, TableAvatar } from '@components'
import { breakpoint, palette } from '@theme'
import { useLazyQuery } from '@apollo/client'
import { formatUSDC, rgba } from '@lib'
import { IDonationsQuery } from '@types'
import { SUBSCRIBE_DONATIONS } from '@gql'
// import truncateEthAddress from 'truncate-eth-address'

interface ILeaderboard {
  limit?: number
  grantId: string
  forceUpdate: boolean
}

//TODO Leaderboard needs to subscribe to the donation table, so it receives live updates

const DEFAULT_LIMIT = 3

const Leaderboard = ({ grantId, forceUpdate }: ILeaderboard) => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT)

  const [loadSubcription, { data, error: errorSubcribingDonations }] = useLazyQuery<IDonationsQuery>(
    SUBSCRIBE_DONATIONS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        limit,
        where: {
          _and: [
            {
              grantId: {
                _eq: grantId,
              },
              status: {
                _eq: 'confirmed',
              },
              user: {
                hideFromLeaderboard: {
                  _eq: false,
                },
              },
            },
          ],
        },
      },
    },
  )

  console.log(data)

  useEffect(() => {
    loadSubcription()
  }, [])

  useEffect(() => {
    forceUpdate && loadSubcription()
  }, [forceUpdate])

  const loadedDonations = data && data.Donations ? data.Donations : []

  if (errorSubcribingDonations) {
    console.error('error donation subscription', errorSubcribingDonations)
  }

  const sideItem = (
    <Button outline level={2} onClick={() => setLimit(limit === DEFAULT_LIMIT ? 9999 : DEFAULT_LIMIT)}>
      {limit === DEFAULT_LIMIT ? 'See All' : 'See Less'}
    </Button>
  )

  return (
    <StyledTable title="Leaderboard" {...{ sideItem }}>
      {loadedDonations.map((donation, index) => (
        <TableCell key={`donation-${index}`} highlight>
          <div>
            <TableAvatar profileImage={donation.user!.profileImage} />
            <Name>{donation.user?.artizenHandle}</Name>
          </div>
          <Amount>{donation.amount} ETH</Amount>
        </TableCell>
      ))}
    </StyledTable>
  )
}

const StyledTable = styled(props => <Table {...props} />)`
  margin-top: 24px;
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
