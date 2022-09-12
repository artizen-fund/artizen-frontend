import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Leaderboard from './Leaderboard'
import Perks from './Perks'
import Countdown from './Countdown'
import { Glyph, ProgressBar, Button, StickyContent, StickyCanvas } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { formatUSDC, rgba } from '@lib'
import { ISidebarDonatorsQuery, IGetDonationFromBlockchainQuery, IGetUsersByPublicAddressQuery } from '@types'
import { GET_DONATIONS_FROM_BLOCKCHAIN, GET_USERS_BY_PUBLIC_ADDRESSES } from '@gql'

export type ISidebar = Pick<ISidebarDonatorsQuery, 'onChainDonations'> & {
  FUND_GOAL: number
  raffle: any
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const Sidebar = ({ FUND_GOAL, raffle }: ISidebar) => {
  const raffleId = raffle?.raffleID.toString()
  const fundDeadline = raffle ? new Date(raffle?.endTime.toNumber() * 1000) : undefined
  const fundStart = raffle ? new Date(raffle?.startTime.toNumber() * 1000) : undefined

  const { data, loading } = useQuery<IGetDonationFromBlockchainQuery>(GET_DONATIONS_FROM_BLOCKCHAIN, {
    variables: { raffleId },
    skip: !raffleId,
    onError: error => console.error('error loading donation blockchain', error),
  })

  const donations = data?.Donation?.donations

  const addresses = donations?.map(({ userAddress }) => userAddress.toLowerCase())

  const totalRaised = donations?.reduce((total, obj) => parseInt(obj.amount) + total, 0)

  const formatedTotalRaised = totalRaised && formatUSDC(totalRaised)

  const { data: donorData, loading: loadingDonors } = useQuery<IGetUsersByPublicAddressQuery>(
    GET_USERS_BY_PUBLIC_ADDRESSES,
    {
      skip: !raffleId || loading,
      variables: { addresses },
      onError: error => console.error('error ', error),
    },
  )

  const donationsWithUser = []
  if (donations && donations.length > 0 && !loadingDonors) {
    for (let i = 0; i < donations.length; i++) {
      const user =
        donorData &&
        donorData.User.find(item => item.publicAddress.toLowerCase() === donations[i]['userAddress'].toLowerCase())

      donationsWithUser.push({ ...donations[i], user })
    }
  }

  return (
    <StyledStickyCanvas>
      <Wrapper>
        <Header>
          Join our{' '}
          <strong>
            {fundStart ? monthNames[fundStart?.getMonth()] : ''}, {fundStart?.getFullYear()}
          </strong>{' '}
          donation drive
        </Header>
        <Content>
          <FundBlock>
            {formatedTotalRaised && (
              <AmountRaised>
                <span>${formatedTotalRaised.toLocaleString()}</span> raised of ${FUND_GOAL.toLocaleString()} goal
              </AmountRaised>
            )}
            <ProgressBar>{formatedTotalRaised / FUND_GOAL}</ProgressBar>
            <Row>
              {fundDeadline && <Countdown date={fundDeadline?.toISOString()} />}
              {donations && (
                <DonationCount>
                  <Glyph glyph="trend" /> <span>{donations.length} donations</span>
                </DonationCount>
              )}
            </Row>
          </FundBlock>
          <Row>
            <Button onClick={() => alert('todo: implement this')} level={1} stretch glyph="donate">
              Donate
            </Button>
            <Button onClick={() => alert('todo: implement this')} level={1} stretch outline>
              Share Now
            </Button>
          </Row>
          <LargeScreensOnly>
            {donationsWithUser.length > 0 && <Leaderboard {...{ donations: donationsWithUser }} />}
            <Perks />
          </LargeScreensOnly>
        </Content>
      </Wrapper>
    </StyledStickyCanvas>
  )
}

const StyledStickyCanvas = styled(props => <StickyCanvas {...props} />)`
  grid-area: sidebar;
`

const Wrapper = styled(props => <StickyContent {...props} />)`
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.slate)};
    border-bottom: 1px solid rgba(114, 124, 140, 0.12);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.4);
  }
  border-radius: 0px 0px 16px 16px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: 388px;
    top: 92px;
    border-radius: 16px 16px 16px 16px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    max-width: 498px;
    top: 108px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px 32px 32px 32px;
  gap: 32px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 32px 40px 40px 40px;
    gap: 40px;
  }
  > * {
    width: 100%;
  }
`

const FundBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 24px;
  }
  > * {
    width: 100%;
  }
`

const AmountRaised = styled.div`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
  span {
    ${typography.title.l3}
    color: ${rgba(palette.night)};
    @media (prefers-color-scheme: dark) {
      color: ${rgba(palette.moon)};
    }
  }
`

const DonationCount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    gap: 16px;
  }
`

const Header = styled.h3`
  padding: 19px 32px 0px 32px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 26px 40px 0px 40px;
  }
  ${typography.label.l1}
  font-weight: 500;
  strong {
    font-weight: 600;
  }
`

const LargeScreensOnly = styled.div`
  display: none;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    display: contents;
  }
`

export default Sidebar
