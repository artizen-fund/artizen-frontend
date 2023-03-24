import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { LOAD_SEASONS } from '@gql'
import { ILoadSeasonsQuery } from '@types'

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
import { rgba } from '@lib'
import { typography, breakpoint, palette } from '@theme'
import { header, alternatingPanels, faq } from '@copy/home'

const CURRENT_SEASON = 1

const IndexPage = () => {
  const [limit, setLimit] = useState(15)

  const { loading, data, error } = useQuery<ILoadSeasonsQuery>(LOAD_SEASONS, {
    variables: {
      where: { index: { _eq: CURRENT_SEASON } },
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
            {!loading &&
              data?.Seasons[0].submissions?.map(
                (submission, index) =>
                  submission.project && <ProjectCard project={submission.project} {...{ index }} key={submission.id} />,
              )}
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
