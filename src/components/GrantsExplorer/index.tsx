import { useState } from 'react'
import styled from 'styled-components'
import Countdown from './Countdown'
import { Glyph, ProgressBar, Button, StickyContent, StickyCanvas, Leaderboard, Spinner, DonationBox } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { IGrantsWithProjectFragment } from '@types'
import { rgba, formatStringDate } from '@lib'

interface IGrantsExplorer {
  grant?: IGrantsWithProjectFragment
}

const GrantsExplorer = ({ grant }: IGrantsExplorer) => {
  const [amountRaised, setAmountRaised] = useState(0)
  if (!grant) return <Spinner />

  const moveToNextGround = () => {
    console.log('move to next grant')

    window.location.href = `${window.location.protocol}//${window.location.host}/grants/today`
  }

  return (
    <StyledStickyCanvas>
      <Wrapper id="grant-explorer">
        <Nav>
          <Button glyphOnly glyph="arrow" glyphRotation={90} onClick={() => alert('previous')} level={2} disabled>
            previous
          </Button>
          <Copy>
            <Date>Today’s Grant</Date>
            <Description>{formatStringDate(grant.date)}</Description>
          </Copy>
          <Button glyphOnly glyph="arrow" glyphRotation={-90} onClick={() => alert('next')} level={2} disabled>
            next
          </Button>
        </Nav>
        <Body>
          <Header>{grant.submission?.project?.title}</Header>

          <ProgressBar>{amountRaised / (grant.goal || 1)}</ProgressBar>

          <GrantData>
            <div>
              <DataLabel>Raised</DataLabel>
              <AmountRaisedRow>
                <Glyph glyph="ethereum" level={2} />
                <AmountRaised>{amountRaised.toFixed(3)}</AmountRaised>
                <Goal>&nbsp;/ {grant.goal} goal</Goal>
              </AmountRaisedRow>
            </div>

            <div>
              <DataLabel>Ends in</DataLabel>
              <Countdown date={grant.closingDate} onComplete={moveToNextGround} />
            </div>
          </GrantData>

          {grant.blockchainId && <DonationBox grantId={grant.id} blockchainId={grant.blockchainId} />}

          <Leaderboard grantId={grant.id} {...{ setAmountRaised }} />
        </Body>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px;
`

const Copy = styled.header`
  text-align: center;
`

const Date = styled.div`
  ${typography.title.l4}
`

const Description = styled.div`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const Body = styled.div`
  padding: 24px;
`

const GrantData = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-bottom: 25px;
  > div:first-child {
    position: relative;
    &:after {
      content: ' ';
      position: absolute;
      top: 0;
      right: -15px;
      width: 1px;
      height: 100%;
      background: ${rgba(palette.stone)};
    }
  }
`

const DataLabel = styled.div`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
  margin-bottom: 0.5em;
`

const Goal = styled.div`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const Header = styled.h3`
  ${typography.title.l2}
`

const AmountRaisedRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const AmountRaised = styled.div`
  ${typography.title.l4}
`

export default GrantsExplorer
