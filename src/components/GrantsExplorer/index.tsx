import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import Countdown from './Countdown'
import { Glyph, ProgressBar, Button, StickyContent, StickyCanvas, Leaderboard, Spinner, DonationBox } from '@components'
import { breakpoint, palette, typography } from '@theme'
import { formatUSDC, rgba } from '@lib'
import { monthNames } from '@copy/common'
import { LOAD_GRANTS } from '@gql'
import { ILoadGrantsQuery } from '@types'
import { useRouter } from 'next/router'

type Grant = { __typename?: 'Grants'; id: any; date: any; status: string; blockchainId?: string | null }

const GrantsExplorer = () => {
  const {
    query: { date },
  } = useRouter()

  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    skip: date === undefined,
    variables: {
      where: {
        date: {
          _eq: date,
        },
      },
    },
  })

  const [activeGrant, setActiveGrant] = useState<Grant>()
  useEffect(() => {
    setActiveGrant(loadedGrantData?.Grants[0])
  }, [loadedGrantData])

  console.log('loadedGrantData ', loadedGrantData, errorLoadingGrant)

  return !activeGrant ? (
    <Spinner />
  ) : (
    <StyledStickyCanvas>
      <Wrapper>
        <Nav>
          <Button glyphOnly glyph="arrow" glyphRotation={90} onClick={() => alert('previous')} level={2}>
            previous
          </Button>
          <Copy>
            <Date>Dec 8, 2022</Date>
            <Description>Today’s Grant</Description>
          </Copy>
          <Button glyphOnly glyph="arrow" glyphRotation={-90} onClick={() => alert('next')} level={2}>
            next
          </Button>
        </Nav>

        <ProgressBar>{0.5}</ProgressBar>

        <Header>Title of Project</Header>

        <GrantData>
          <div>
            <DataLabel>Raised</DataLabel>
            <Glyph glyph="ethereum" />
            <AmountRaised>totalRaised.toLocaleString()</AmountRaised>
            <Goal>fundRaisingGoal.toLocaleString() goal</Goal>
          </div>

          <div>
            <DataLabel>Ends in</DataLabel>
            <AmountRaised>
              <Countdown date="2022-12-09" />
            </AmountRaised>
          </div>
        </GrantData>

        {activeGrant.blockchainId && <DonationBox blockchainId={activeGrant.blockchainId} />}

        <Leaderboard />

        <Sponsors>
          <img src="/assets/microsoft.svg" alt="Microsoft" />
          <img src="/assets/extended-reality.svg" alt="Extended Reality" />
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
`

export default GrantsExplorer
