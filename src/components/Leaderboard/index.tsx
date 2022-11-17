import styled from 'styled-components'
import { Button, Table, TableCell, Spinner } from '@components'
import { breakpoint, palette } from '@theme'
import { formatUSDC, rgba } from '@lib'
import { IUsers } from '@types'
import truncateEthAddress from 'truncate-eth-address'

interface ILeaderboard {
  limit?: number
}

const Leaderboard = (props: ILeaderboard) => {
  const limit = props.limit || 3

  const sideItem = (
    <Button href="/leaderboard" outline level={2}>
      See All
    </Button>
  )

  const getUserIdentifier = (user: IUsers) => {
    return user?.firstName || user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : truncateEthAddress(user?.publicAddress || '')
  }

  return (
    <Table title="Leaderboard" {...{ sideItem }}>
      {/*
        {donations.map((donation, index) => (
          <TableCell key={`donation-${index}`} highlight>
            <div>
              <div>#{index + 1}</div>
              {donation.user?.profileImage && <Avatar profileImage={donation.user?.profileImage} />}
              <Name>
                {getUserIdentifier(donation.user)}
                {index === 0 && <span> 👑</span>}
              </Name>
            </div>
            <Amount>${formatUSDC(Number(donation.amount))}</Amount>
          </TableCell>
        )}
      */}
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
