import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Countdown from './Countdown'
import { Glyph, ProgressBar, StickyContent, StickyCanvas, Leaderboard, Shimmer, DonationBox } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { IGrantsWithProjectFragment } from '@types'
import { rgba, isCurrentGrant } from '@lib'
import GrantsNavigator from './GrantsNavigator'

interface IGrantsExplorer {
  grant?: IGrantsWithProjectFragment
}

const GrantsExplorer = ({ grant }: IGrantsExplorer) => {
  const { push } = useRouter()
  const [amountRaised, setAmountRaised] = useState(0)

  const isCurrent = isCurrentGrant(grant)

  const moveToNextGrant = () => {
    setTimeout(() => {
      console.log('updating...')
      window.location.assign(`${window.location.protocol}//${window.location.host}/grants/today`)
    }, 5000)
  }

  return (
    <StyledStickyCanvas>
      <Wrapper>
        {!grant ? <GrantsNavigatorShimmer /> : <GrantsNavigator {...{ grant }} />}
        <Body>
          <Header>{!grant ? <Shimmer height="30px" /> : grant?.submission?.project?.title}</Header>

          <ProgressBar>{amountRaised / (grant?.goal || 1)}</ProgressBar>

          <GrantData>
            {!grant ? (
              <>
                <Shimmer height="60px" />
                <Shimmer height="60px" />
              </>
            ) : (
              <>
                <div>
                  <DataLabel>Raised</DataLabel>
                  <AmountRaisedRow>
                    <Glyph glyph="ethereum" level={2} />
                    <AmountRaised>{amountRaised.toFixed(3)}</AmountRaised>
                    <Goal>&nbsp;/ {grant?.goal} goal</Goal>
                  </AmountRaisedRow>
                </div>
                {isCurrent && (
                  <div>
                    <DataLabel>Ends in</DataLabel>
                    <Countdown date={grant?.closingDate} onComplete={() => moveToNextGrant()} />
                  </div>
                )}
              </>
            )}
          </GrantData>

          {isCurrent && grant?.blockchainId && <DonationBox blockchainId={grant?.blockchainId} />}

          {!grant ? (
            <Gap>
              <Shimmer height="30px" />
              <Shimmer height="70px" />
            </Gap>
          ) : (
            <Leaderboard grantId={grant?.id} {...{ setAmountRaised }} />
          )}
        </Body>
      </Wrapper>
    </StyledStickyCanvas>
  )
}

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const GrantsNavigatorShimmer = styled(props => <Shimmer {...props} />)`
  margin: auto;
  max-width: 250px;
  height: 40px;
  justify-content: center;
`

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

const Body = styled.div`
  padding: 24px;
`

const GrantData = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-bottom: 25px;
  > div:nth-child(2) {
    position: relative;
    &:after {
      content: ' ';
      position: absolute;
      top: 0;
      left: -15px;
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
