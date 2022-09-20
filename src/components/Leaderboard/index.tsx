import styled from 'styled-components'
import truncateEthAddress from 'truncate-eth-address'
import _ from 'lodash'
import { Button, Table, TableCell, Icon } from '@components'
import { breakpoint, palette } from '@theme'
import { formatUSDC, rgba, useCampaign, sizeForLevel } from '@lib'
import { IUser } from '@types'

const Leaderboard = () => {
  const { donationsWithUser } = useCampaign()
  if (!donationsWithUser) return <></>

  const sideItem = (
    <Button onClick={() => alert('do something')} outline level={2}>
      See All
    </Button>
  )

  const getUserIdentifier = (user: IUser) => {
    return user?.firstName || user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : truncateEthAddress(user?.publicAddress || '')
  }

  return (
    <Table title="Leaderboard Position" {...{ sideItem }}>
      {_.orderBy(donationsWithUser, item => Number(item.amount), ['desc'])
        .slice(0, 3)
        .map((donation: Donation, index) => (
          <TableCell key={`donation-${index}`}>
            <div>
              <div>#{index + 1}</div>
              {donation.user?.profileImage && <Avatar profileImage={donation.user?.profileImage} />}
              <Name>
                {!donation.user?.profileImage && <Icon glyph="face" level={2} />}
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
  min-width: ${sizeForLevel('mobile', 2)}px;
  width: ${sizeForLevel('mobile', 2)}px;
  height: ${sizeForLevel('mobile', 2)}px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: block;
    min-width: ${sizeForLevel('laptop', 2)}px;
    width: ${sizeForLevel('laptop', 2)}px;
    height: ${sizeForLevel('laptop', 2)}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    min-width: ${sizeForLevel('desktop', 2)}px;
    width: ${sizeForLevel('desktop', 2)}px;
    height: ${sizeForLevel('desktop', 2)}px;
  }

  background-image: url(${props => props.profileImage});
  background-size: cover;
  background-position: center center;
  border-radius: 9999px;
  border: 2px solid ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    border-color: ${rgba(palette.slate)};
  }
`

export default Leaderboard
