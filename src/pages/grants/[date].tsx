import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { LOAD_GRANTS } from '@gql'
import { useRef } from 'react'
import moment from 'moment-timezone'
import {
  FeaturedArt,
  FeaturedArtPanel,
  Layout,
  Team,
  Newsletter,
  PagePadding,
  AlternatingPanels,
  AlternatingPanel,
  GrantsExplorer,
  Button,
  ApplyForFundingBlurb,
  Faq,
} from '@components'
import { rgba, TODAY } from '@lib'
import { typography, breakpoint, palette } from '@theme'
import { header, alternatingPanels } from '@copy/home'
import { ILoadGrantsQuery } from '@types'

const GrantPage = () => {
  const {
    query: { date },
  } = useRouter()
  const parsedDataRef = useRef('')

  if (date === TODAY && parsedDataRef.current === '') {
    const loadingAngelesTime = moment.tz('America/Los_Angeles').format()
    parsedDataRef.current = loadingAngelesTime
    console.log('set today time now    ', loadingAngelesTime)
  }

  const {
    loading,
    data: loadedGrantData,
    error: errorLoadingGrant,
  } = useQuery<ILoadGrantsQuery>(LOAD_GRANTS, {
    skip: date === undefined,
    variables: {
      where: {
        _and: [
          {
            startingDate: {
              _lte: parsedDataRef.current,
            },
            closingDate: {
              _gte: parsedDataRef.current,
            },
          },
        ],
      },
    },
  })

  console.log('loadedGrantData   ', loadedGrantData)

  if (errorLoadingGrant) {
    console.error('Error loading grant error   ', errorLoadingGrant)
    throw new Error('Non Grant Loaded')
  }

  const activeGrant = loadedGrantData?.Grants[0]

  return (
    <Layout>
      <Header>
        <h1>{header.title}</h1>
        <h2>{header.subtitle}</h2>
      </Header>
      <StyledPagePadding>
        <Wrapper>
          <FeaturedArt grant={activeGrant} {...{ loading }} />
          <FeaturedArtPanel grant={activeGrant} {...{ loading }} />
          <GrantsExplorer grant={activeGrant} {...{ loading }} />
        </Wrapper>
      </StyledPagePadding>
      <AlternatingPanels>
        {alternatingPanels.map((panel, i) => (
          <AlternatingPanel key={`panel-${i}`} {...panel}>
            <Button href={panel.destination} level={1}>
              {panel.buttonLabel}
            </Button>
          </AlternatingPanel>
        ))}
      </AlternatingPanels>
      <Newsletter />
      <ApplyForFundingBlurb />
      <Faq />
      <Team />
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

const Header = styled(props => <PagePadding {...props} />)`
  h1 {
    ${typography.title.l1};
  }
  h2 {
    margin-top: 0.5em;
    ${typography.body.l1};
  }
`

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  position: relative;
  padding: 40px 24px;
  background: ${rgba(palette.moon)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate, 0.64)};
    border-width: 0.5px 0px;
    border-style: solid;
    border-color: rgba(114, 124, 140, 0.4);
  }
`

const Wrapper = styled.section`
  position: relative;
  display: grid;
  grid-template-areas: 'featuredArt' 'sidebar' 'tabbedInfo';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'featuredArt sidebar' 'tabbedInfo sidebar';
    grid-gap: 0px 30px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0px 80px;
  }
  padding-bottom: 100px;
`
// todo: above is just a filled-in value, check design

export default GrantPage
