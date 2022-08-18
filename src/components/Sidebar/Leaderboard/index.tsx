import styled from 'styled-components'
import { Button, Table, TableCell } from '@components'
import { breakpoint, palette } from '@theme'
import { formatUSDC, rgba } from '@lib'
import { ISidebarDonatorsQuery } from '@types'

export type ILeaderboard = Pick<ISidebarDonatorsQuery, 'onChainDonations'>

const Leaderboard = ({ onChainDonations }: ILeaderboard) => {
  const sideItem = (
    <Button onClick={() => alert('do something')} outline level={2}>
      See All
    </Button>
  )

  return (
    <Table title="Leaderboard" {...{ sideItem }}>
      {onChainDonations?.donations?.map((donation, index) => (
        <TableCell key={`donation-${index}`}>
          <div>
            <div>#{index + 1}</div>
            {donation.User?.profileImage && <Avatar profileImage={donation.User?.profileImage} />}
            <Name>
              {donation.User?.firstName} {donation.User?.lastName} herp derp derp
              {index === 0 && <span>👑</span>}
            </Name>
          </div>
          <Amount>${formatUSDC(donation.amount)}</Amount>
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
