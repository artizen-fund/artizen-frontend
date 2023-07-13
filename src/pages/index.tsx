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
import { rgba, SeasonContext, useDateHelpers } from '@lib'
import { breakpoint, palette } from '@theme'
import { alternatingPanels, faq } from '@copy/home'

const IndexPage = () => {
  const { asPath } = useRouter()
  const { isSeasonActive } = useDateHelpers()
  const [arrangedSeasonList, setArrangedSeasonList] = useState<ISubmissionFragment[] | null>(null)
  const [totalSales, setTotalSales] = useState<number>(0)

  const { seasonId } = useContext(SeasonContext)

  const arrangeSubmissions = (submissions: ISubmissionFragment[]) =>
    submissions.sort((s1: ISubmissionFragment, s2: ISubmissionFragment) => {
      return (
        s2.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies! -
        s1.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!
      )
    })

  const countTotalSales = (submissions: ISubmissionFragment[]): number => {
    let total = 0

    submissions.forEach(submission => {
      total += submission.project!.artifacts[0].openEditionCopies_aggregate.aggregate!.sum!.copies!
    })

    return total
  }

  const { data, loading, error } = useSubscription<ISubscribeSeasonsSubscription>(SUBSCRIBE_SEASONS, {
    skip: !seasonId,
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        id: { _eq: seasonId },
      },
      order_by: { submissions_aggregate: { count: 'asc' } },
    },
    onData: ({ data: { data, loading, error } }) => {
      if (!loading && !error && data?.Seasons[0]) {
        const arrangedSeasonList = arrangeSubmissions(data?.Seasons[0].submissions)
        const totalSales = countTotalSales(data?.Seasons[0].submissions)
        setArrangedSeasonList(arrangedSeasonList.splice(0, 2))
        setTotalSales(totalSales)
      }

      console.log('Seasons from subscription ', data)
    },
  })

  useEffect(() => {
    const hash = asPath.split('#')[1]
    if (!!hash && hash === 'submissions') {
      const submissionsMarker = document.querySelector('#submissionsMarker')
      submissionsMarker?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  console.log('data  ', data)

  const seasonIsActive = isSeasonActive(data?.Seasons[0]?.startingDate, data?.Seasons[0]?.endingDate)

  console.log('data?.Seasons[0]  ', data?.Seasons[0])

  console.log('totalSales homepage ::::: ', totalSales)

  return (
    <Layout>
      <HomeHeader season={data?.Seasons[0]} {...{ loading }} />
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
                  matchFundPooled={50}
                  totalSales={totalSales}
                  project={submission.project}
                  {...{ index }}
                  key={submission.id}
                />
              ))}
            </Grid>
          </StyledPagePadding>
        </>
      )}
      {!loading && seasonIsActive && data?.Seasons[0] && (
        <>
          <LeaderboardHeader index={data.Seasons[0].index} endingDate={data.Seasons[0].endingDate} />
          <StyledPagePadding>
            <SubmissionsMarker id="submissionsMarker" />
            <Grid>
              {arrangedSeasonList?.map((submission, index) => (
                <ProjectCard
                  matchFundPooled={data?.Seasons[0].matchFundPooled}
                  totalSales={totalSales}
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
