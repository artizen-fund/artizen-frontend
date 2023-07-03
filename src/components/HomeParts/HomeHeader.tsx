import { useContext } from 'react'
import styled from 'styled-components'
import { PagePadding, Button, HomeAnimation, Countdown } from '@components'
import { header } from '@copy/home'
import { typography, breakpoint, palette } from '@theme'
import { useGnosis, rgba, SeasonContext } from '@lib'
import { ISeasonFragment } from '@types'

interface IHomeHeader {
  season?: ISeasonFragment
  loading?: boolean
}

const HomeHeader = ({ season, loading }: IHomeHeader) => {
  const { isSeasonActive } = useContext(SeasonContext)

  const scrollToLeaderboard = () => {
    const submissionsMarker = document.querySelector('#submissionsMarker')
    submissionsMarker?.scrollIntoView({ behavior: 'smooth' })
  }

  const { safeBalanceUSD } = useGnosis()

  const title = header.title.replace(
    /SAFE_BALANCE_USD/,
    Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(safeBalanceUSD || '0')),
  )

  return (
    <StyledPagePadding>
      <Header>
        <HomeAnimation />
        <Copy>
          <div>
            <h1>{title}</h1>
            <h2>{header.subtitle}</h2>
          </div>
          {!loading && !!isSeasonActive && (
            <Button level={0} onClick={scrollToLeaderboard}>
              {header.buttonLabel}
            </Button>
          )}
          {!loading && !isSeasonActive && (
            <Row>
              <Button level={0} href="https://vote.artizen.fund/submit">
                Submit to Season 3
              </Button>
              {/* !!season && (
                <Col>
                  <Label>Starts in</Label>
                  <Data>
                    <Countdown date={season.startingDate} />
                  </Data>
                </Col>
              ) */}
            </Row>
          )}
        </Copy>
      </Header>
    </StyledPagePadding>
  )
}

const Col = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-around;
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  padding-bottom: 0;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
  }
`

const Copy = styled.header`
  position: relative;
  z-index: 1;
  flex: 1;
  h1 {
    ${typography.title.l1};
  }
  h2 {
    margin-top: 0.5em;
    ${typography.body.l1};
  }
  > div {
    margin-bottom: 30px;
    @media only screen and (min-width: ${breakpoint.tablet}px) {
      margin-bottom: 45px;
    }
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      margin-bottom: 60px;
    }
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`

const Label = styled.h3`
  ${typography.label.l1}
  color: ${rgba(palette.barracuda)};
`

const Data = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: bottom;
  gap: 16px;
  ${typography.title.l4}
`

export default HomeHeader
