import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Table, TableCell, TableAvatar, Spinner } from '@components'
import { useSubscription } from '@apollo/client'
import { reduceWithPrecision } from '@lib'
import { IDonationsSubscription } from '@types'
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

  const { loading, error, data } = useSubscription<IDonationsSubscription>(SUBSCRIBE_DONATIONS, {
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
  })

  console.log('data   ', data)

  if (error) {
    console.error('error donation subscription', error)
  }

  useEffect(() => {
    if (!data) return
    setAmountRaised(reduceWithPrecision(data.Donations.map((d: any) => d.amount))((a: number, b: number) => a + b))
  }, [data])

  const sideItem = (
    <Button outline level={2} onClick={() => setLimit(limit === DEFAULT_LIMIT ? 9999 : DEFAULT_LIMIT)}>
      {limit === DEFAULT_LIMIT ? 'See All' : 'See Less'}
    </Button>
  )

  return !!loading || !data?.Donations ? (
    <Spinner />
  ) : (
    <StyledTable title="Leaderboard" {...{ sideItem }}>
      {data?.Donations.map(
        (donation, index) =>
          !!donation.user && (
            <TableCell key={`donation-${index}`} highlight>
              <div>
                <TableAvatar profileImage={donation.user.profileImage} />
                <Name>{donation.user?.artizenHandle}</Name>
              </div>
              <Amount>{donation.amount} ETH</Amount>
            </TableCell>
          ),
      )}
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
