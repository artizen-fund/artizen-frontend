import styled from 'styled-components'
import { useSubscription } from '@apollo/client'
import moment from 'moment-timezone'
import { SUBSCRIBE_SEASONS } from '@gql'
import { ISubscribeSeasonsQuery } from '@types'
import {
  HomeHeader,
  Layout,
  Newsletter,
  PagePadding,
  AlternatingPanels,
  AlternatingPanel,
  Button,
  ApplyForFundingBlurb,
  Faq,
  PartnersRibbon,
  HomeRibbon,
  LeaderboardHeader,
  ProjectCard,
} from '@components'
import { rgba, ARTIZEN_TIMEZONE } from '@lib'
import { breakpoint, palette } from '@theme'
import { alternatingPanels, faq } from '@copy/home'

const IndexPage = () => {
  const { data } = useSubscription<ISubscribeSeasonsQuery>(SUBSCRIBE_SEASONS, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        startingDate: { _lte: moment().tz(ARTIZEN_TIMEZONE).format() },
        endingDate: { _gt: moment().tz(ARTIZEN_TIMEZONE).format() },
      },
      order_by: { submissions_aggregate: { count: 'asc' } },
    },
  })

  return (
    <Layout>
      <HomeHeader />
      <PartnersRibbon />
      <HomeRibbon />
      <LeaderboardHeader />
      <StyledPagePadding>
        <PagePadding>
          <Grid>
            {data?.Seasons[0].submissions?.map((submission, index) => (
              <ProjectCard project={submission.project} {...{ index }} key={submission.id} />
            ))}
          </Grid>
        </PagePadding>
      </StyledPagePadding>
      <Newsletter />
      <AlternatingPanels>
        {alternatingPanels.map((panel, i) => (
          <AlternatingPanel key={`panel-${i}`} {...panel}>
            <Button href={panel.destination} level={1}>
              {panel.buttonLabel}
            </Button>
          </AlternatingPanel>
        ))}
      </AlternatingPanels>
      <Faq copy={faq} />
      <ApplyForFundingBlurb />
    </Layout>
  )
}

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  position: relative;
  background: ${rgba(palette.wash)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate, 0.64)};
    border-width: 0.5px 0px;
    border-style: solid;
    border-color: rgba(114, 124, 140, 0.4);
  }
`

const Grid = styled.div`
  display: grid;
  gap: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export default IndexPage
