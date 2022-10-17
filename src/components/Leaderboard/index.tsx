import styled from 'styled-components'
import { Button, Table, TableCell } from '@components'
import { breakpoint, palette } from '@theme'
import { formatUSDC, rgba, useCampaign } from '@lib'
import _ from 'lodash'
import { IUser } from '@types'
import truncateEthAddress from 'truncate-eth-address'

interface ILeaderboard {
  limit?: number
}

const Leaderboard = (props: ILeaderboard) => {
  const { donationsWithUser } = useCampaign()

  const limit = props.limit || 3

  const sideItem = (
    <Button href="/leaderboard" outline level={2}>
      See All
    </Button>
  )

  const getUserIdentifier = (user: IUser) => {
    return user?.firstName || user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : truncateEthAddress(user?.publicAddress || '')
  }

  if (!donationsWithUser) return <></>
  return (
    <Table title="Leaderboard" {...{ sideItem }}>
      {_.orderBy(donationsWithUser, item => Number(item.amount), ['desc'])
        .slice(0, limit)
        .map((donation: Donation, index) => (
          <TableCell key={`donation-${index}`} highlight>
            <div>
              <div>#{index + 1}</div>
              {donation.user?.profileImage && <Avatar profileImage={donation.user?.profileImage} />}
              <Name>
                {getUserIdentifier(donation.user)}
                {index === 0 && <span>👑</span>}
              </Name>
            </div>
            <Amount>${formatUSDC(Number(donation.amount))}</Amount>
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
