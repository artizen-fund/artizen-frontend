import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
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
  HomeLoadingShimmer,
} from '@components'
import { rgba, SeasonSubcriptionContext } from '@lib'
import { breakpoint, palette } from '@theme'
import { alternatingPanels, faq } from '@copy/home'

const MAXIMUN_NUMBER_OF_LOADING = 9

const IndexPage = () => {
  const { asPath } = useRouter()
  const [numberOfLoading, setNumberOfLoading] = useState<number>(MAXIMUN_NUMBER_OF_LOADING)
  const { season, loading, arrangedSeasonList, seasonIsActive, totalSales, totalPrizePooled, totalBase } =
    useContext(SeasonSubcriptionContext)

  const arrangedSeasonListCapped = arrangedSeasonList?.slice(0, numberOfLoading)

  const length = arrangedSeasonList?.length

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
      {!loading && (
        <>
          <LeaderboardHeader
            loading={loading}
            index={season?.index}
            endingDate={season?.endingDate}
            totalPrizePooled={totalPrizePooled}
            seasonIsActive={seasonIsActive}
          />
          <StyledPagePadding>
            <SubmissionsMarker id="submissionsMarker" />
            <Grid>
              {arrangedSeasonListCapped?.map((submission, index) => (
                <ProjectCard
                  matchFundPooled={season?.matchFundPooled}
                  totalSales={totalSales ? totalSales : 0}
                  project={submission.project}
                  {...{ index }}
                  key={submission.id}
                  totalBase={totalBase}
                  seasonIsActive={seasonIsActive}
                />
              ))}
            </Grid>
            {length && length > numberOfLoading && (
              <StyledButton
                outline
                level={1}
                onClick={() => {
                  setNumberOfLoading(numberOfLoading + MAXIMUN_NUMBER_OF_LOADING)
                }}
              >
                Load More
              </StyledButton>
            )}
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

const StyledButton = styled(props => <Button {...props} />)`
  margin: 32px auto 0;
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
