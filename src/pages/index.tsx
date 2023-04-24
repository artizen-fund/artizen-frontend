import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_SEASONS } from '@gql'
import { ISubscribeSeasonsSubscription, ISubmissionFragment } from '@types'
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
  NoGrant,
  HomeLoadingShimmer,
} from '@components'
import { rgba, SeasonContext } from '@lib'
import { breakpoint, palette } from '@theme'
import { alternatingPanels, faq } from '@copy/home'

const IndexPage = () => {
  const { currentSeasonId } = useContext(SeasonContext)

  const { data, loading, error } = useSubscription<ISubscribeSeasonsSubscription>(SUBSCRIBE_SEASONS, {
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        id: { _eq: currentSeasonId },
      },
      order_by: { submissions_aggregate: { count: 'asc' } },
    },
  })

  return (
    <Layout>
      <HomeHeader />
      <PartnersRibbon />
      <HomeRibbon />
      {loading && <HomeLoadingShimmer />}
      {!loading && data?.Seasons[0] && (
        <>
          <LeaderboardHeader index={data.Seasons[0].index} endingDate={data.Seasons[0].endingDate} />
          <StyledPagePadding>
            <SubmissionsMarker id="submissionsMarker" />
            <Grid>
              {data?.Seasons[0].submissions
                ?.sort(
                  (s1: ISubmissionFragment, s2: ISubmissionFragment) =>
                    s2.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies! -
                    s1.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!,
                )
                .map((submission, index) => (
                  <ProjectCard project={submission.project} {...{ index }} key={submission.id} />
                ))}
            </Grid>
          </StyledPagePadding>
        </>
      )}
      {!loading && !data?.Seasons[0] && <NoGrant />}
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
  padding-top: 0px !important;
`

const SubmissionsMarker = styled.div`
  position: absolute;
  top: -260px;
  width: 1px;
  height: 1px;
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
  @media only screen and (min-width: ${breakpoint.laptopXL}px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export default IndexPage
