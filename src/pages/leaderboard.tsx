import { useContext } from 'react'
import styled from 'styled-components'
import { Button, Layout, Metrics, Newsletter, PagePadding, AlternatingPanel, Leaderboard, Curators } from '@components'
import { DonationContext } from '@lib'
import { typography, breakpoint } from '@theme'
import { leaderboardPage } from '@copy/leaderboard'
import { metrics } from '@copy/home'

const LeaderboardPage = () => {
  const { toggleShelf } = useContext(DonationContext)
  return (
    <Layout>
      <Header>
        <h1>{leaderboardPage.title}</h1>
        <h2>{leaderboardPage.subtitle}</h2>
      </Header>

      <PagePadding>
        <AlternatingPanel {...leaderboardPage.topBlock} imageOnRight>
          <Buttons>
            <Button onClick={() => toggleShelf?.('donate')} level={1} glyph="donate">
              {leaderboardPage.topBlock.buttonLabel}
            </Button>
            <Button onClick={() => alert('derp')} outline level={1}>
              Share Now
            </Button>
          </Buttons>
        </AlternatingPanel>
      </PagePadding>

      <PagePadding>
        <LeaderboardWrapper>
          <Leaderboard limit={9999} />
          <Buttons>
            <Button onClick={() => toggleShelf?.('donate')} level={1} glyph="donate" stretch>
              {leaderboardPage.topBlock.buttonLabel}
            </Button>
            <Button onClick={() => alert('derp')} outline level={1} stretch>
              Share Now
            </Button>
          </Buttons>
        </LeaderboardWrapper>
      </PagePadding>

      <PagePadding>
        <AlternatingPanel {...leaderboardPage.bottomBlock}>
          <Buttons>
            <Button href={leaderboardPage.bottomBlock.destination} target="_blank" level={1} glyph="discord">
              {leaderboardPage.bottomBlock.buttonLabel}
            </Button>
            <Button onClick={() => alert('derp')} outline level={1} glyph="twitter">
              Follow on Twitter
            </Button>
          </Buttons>
        </AlternatingPanel>
      </PagePadding>

      <Newsletter />
      <Metrics {...{ metrics }} />
    </Layout>
  )
}

const Header = styled(props => <PagePadding {...props} />)`
  h1 {
    ${typography.title.l1};
  }
  h2 {
    ${typography.body.l1};
  }
`

const LeaderboardWrapper = styled.div`
  margin: auto;

  max-width: 500px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: 760px;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`

export default LeaderboardPage
