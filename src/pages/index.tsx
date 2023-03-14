import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { LOAD_GRANTS } from '@gql'

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

const GrantPage = () => {
  // const {
  //   loading,
  //   data: loadedGrantData,
  //   error: errorLoadingGrant,
  // } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
  //   variables: {
  //     limit: 1,
  //     where: {
  //       _and: [
  //         {
  //           status: {
  //             _eq: 'published',
  //           },
  //         },
  //         ...conditions,
  //       ],
  //     },
  //   },
  // })

  return (
    <Layout>
      <HomeHeader />
      <PartnersRibbon />
      <HomeRibbon />
      <LeaderboardHeader />
      <StyledPagePadding>
        <PagePadding>
          <Grid>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
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

export default GrantPage
