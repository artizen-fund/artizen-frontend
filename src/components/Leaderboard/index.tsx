import styled from 'styled-components'
import { useEffect } from 'react'
import { Button, Table, TableCell } from '@components'
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

const Leaderboard = ({ grantId, forceUpdate, ...props }: ILeaderboard) => {
  // const limit = props.limit || 3

  const [loadSubcription, { data, error: errorSubcribingDonations }] = useLazyQuery<IDonationsQuery>(
    SUBSCRIBE_DONATIONS,
    {
      variables: {
        where: {
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
    },
  )

  useEffect(() => {
    loadSubcription()
  }, [])

  useEffect(() => {
    forceUpdate && loadSubcription()
  }, [forceUpdate])

  const loadedDonations = data && data.Donations ? data.Donations : []

  if (errorSubcribingDonations) {
    console.error('error donation subscription   ', errorSubcribingDonations)
  }

  const sideItem = (
    <Button href="/leaderboard" outline level={2}>
      See All
    </Button>
  )

  // const getUserIdentifier = (user: IUsers) => {
  //   return user?.firstName || user?.lastName
  //     ? `${user.firstName} ${user.lastName}`
  //     : truncateEthAddress(user?.publicAddress || '')
  // }
  console.log('data', data)
  return (
    <Table title="Leaderboard" {...{ sideItem }}>
      {loadedDonations.map((donation: any, index: number) => (
        <TableCell key={`donation-${index}`} highlight>
          <div>
            <div>#{index + 1}</div>
            {donation.user?.profileImage && <Avatar profileImage={donation.user.profileImage} />}
            <Name>
              {donation.user?.artizenHandle}
              {index === 0 && <span> 👑</span>}
            </Name>
          </div>
          <Amount>{donation.amount} ETH</Amount>
        </TableCell>
      ))}
    </Table>
  )
}

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

const Avatar = styled.div<{
  profileImage: string
}>`
  display: none;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: block;
    width: 36px;
    height: 36px;
    min-width: 36px;

    background-image: url(${props => props.profileImage});
    background-size: cover;
    background-position: center center;
    border-radius: 9999px;
    border: 2px solid ${rgba(palette.white)};
    @media (prefers-color-scheme: dark) {
      border-color: ${rgba(palette.slate)};
    }
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 44px;
    height: 44px;
    min-width: 44px;
  }
`

export default Leaderboard
