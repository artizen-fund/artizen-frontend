import styled from 'styled-components'
import { PagePadding, Button, HomeAnimation } from '@components'
import { header } from '@copy/home'
import { typography, breakpoint } from '@theme'
import { useGnosis } from '@lib'

const HomeHeader = () => {
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
          <Button level={0} onClick={scrollToLeaderboard}>
            {header.buttonLabel}
          </Button>
        </Copy>
      </Header>
    </StyledPagePadding>
  )
}

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
  div {
    margin-bottom: 30px;
    @media only screen and (min-width: ${breakpoint.tablet}px) {
      margin-bottom: 45px;
    }
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      margin-bottom: 60px;
    }
  }
`

export default HomeHeader
