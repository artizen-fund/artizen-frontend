import { useState } from 'react'
import styled from 'styled-components'
import Countdown from './Countdown'
import { Glyph, ProgressBar, Button, StickyContent, StickyCanvas, Leaderboard, Spinner, DonationBox } from '@components'
import { breakpoint, palette, typography } from '@theme'

import { rgba } from '@lib'

interface IGrantsExplorer {
  grant?: Grant
}

const GrantsExplorer = ({ grant }: IGrantsExplorer) => {
  const [updateLeaderBoard, setUpdateLeaderBoard] = useState<boolean>(false)
  if (!grant) return <Spinner />
  const amountRaised = grant.donations.reduce((accum, obj) => accum + obj.amount, 0)

  return (
    <StyledStickyCanvas>
      <Wrapper>
        <Nav>
          <Button glyphOnly glyph="arrow" glyphRotation={90} onClick={() => alert('previous')} level={2}>
            previous
          </Button>
          <Copy>
            <Date>{grant.date}</Date>
            <Description>Today’s Grant</Description>
          </Copy>
          <Button glyphOnly glyph="arrow" glyphRotation={-90} onClick={() => alert('next')} level={2}>
            next
          </Button>
        </Nav>

        <ProgressBar>{amountRaised / (grant.goal || 1)}</ProgressBar>

        <Header>{grant.submission?.project?.title}</Header>

        <GrantData>
          <div>
            <DataLabel>Raised</DataLabel>
            <Glyph glyph="ethereum" />
            <AmountRaised>{amountRaised}</AmountRaised>
            <Goal>{grant.goal} goal</Goal>
          </div>

          <div>
            <DataLabel>Ends in</DataLabel>
            <AmountRaised>
              <Countdown date={grant.closingDate} />
            </AmountRaised>
          </div>
        </GrantData>

        {grant.blockchainId && (
          <DonationBox grantId={grant.id} blockchainId={grant.blockchainId} updatefn={setUpdateLeaderBoard} />
        )}

        <Leaderboard grantId={grant.id} forceUpdate={updateLeaderBoard} />

        <Sponsors>
          <Microsoft src="/assets/microsoft.svg" alt="Microsoft" />
          <ExtendedReality src="/assets/extended-reality.svg" alt="Extended Reality" />
        </Sponsors>
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
    width: 100%;
    top: 92px;
    padding: 40px;
    border-radius: 16px 16px 16px 16px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 108px;
  }
`

const Nav = styled.nav`
  border: 1px dashed ${rgba(palette.uiAlert)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Copy = styled.header`
  text-align: center;
`

const Date = styled.div``

const Description = styled.div``

const GrantData = styled.div`
  display: flex;
  flex-direction: row;
`

const DataLabel = styled.div``

const Goal = styled.div``

const Header = styled.h3``

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

const Sponsors = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const Microsoft = styled.img`
  max-width: 150px;
`

const ExtendedReality = styled.img`
  max-width: 275px;
`

export default GrantsExplorer
