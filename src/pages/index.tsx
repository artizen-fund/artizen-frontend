import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_SEASONS } from '@gql'
import { ISubscribeSeasonsSubscription, ISubmissionFragment, ISeasonFragment, ISubmissions } from '@types'
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
  LastSeasonLeaderboardHeader,
  ProjectCard,
  ProjectCardPreviousSeason,
  HomeLoadingShimmer,
} from '@components'
import { rgba, useDateHelpers, SeasonSubcriptionContext } from '@lib'
import { breakpoint, palette } from '@theme'
import { alternatingPanels, faq } from '@copy/home'

const IndexPage = () => {
  const { asPath } = useRouter()
  const { isSeasonActive } = useDateHelpers()
  const { season, loading, arrangedSeasonList, seasonIsActive, totalSales, totalPrizePooled } =
    useContext(SeasonSubcriptionContext)

  console.log('season in homepage  ', season)
  console.log('loading homepage ::::: ', loading)

  useEffect(() => {
    const hash = asPath.split('#')[1]
    if (!!hash && hash === 'submissions') {
      const submissionsMarker = document.querySelector('#submissionsMarker')
      submissionsMarker?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <Layout>
      <HomeHeader season={season} {...{ loading }} />
      <PartnersRibbon />
      <HomeRibbon />
      {loading && <HomeLoadingShimmer />}
      {!loading && !seasonIsActive && (
        <>
          <LastSeasonLeaderboardHeader />
          <SubmissionsMarker id="submissionsMarker" />
          <StyledPagePadding>
            <Grid>
              {arrangedSeasonList?.map((submission, index) => (
                <ProjectCardPreviousSeason
                  matchFundPooled={season?.matchFundPooled}
                  totalSales={totalSales ? totalSales : 0}
                  project={submission.project}
                  {...{ index }}
                  key={submission.id}
                />
              ))}
            </Grid>
          </StyledPagePadding>
        </>
      )}
      {!loading && seasonIsActive && seasonIsActive && (
        <>
          <LeaderboardHeader
            loading={loading}
            index={season?.index}
            endingDate={season?.endingDate}
            totalPrizePooled={totalPrizePooled}
          />
          <StyledPagePadding>
            <SubmissionsMarker id="submissionsMarker" />
            <Grid>
              {arrangedSeasonList?.map((submission, index) => (
                <ProjectCard
                  matchFundPooled={season?.matchFundPooled}
                  totalSales={totalSales ? totalSales : 0}
                  project={submission.project}
                  {...{ index }}
                  key={submission.id}
                />
              ))}
            </Grid>
          </StyledPagePadding>
        </>
      )}
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
