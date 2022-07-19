import styled from 'styled-components'
import {
  FeaturedArt,
  Layout,
  Metrics,
  Newsletter,
  PagePadding,
  Sidebar,
  TabbedInfo,
  AlternatingPanels,
  AlternatingPanel,
} from '@components'
import { CreateTopUpWallet, rgba, initializeApollo, addApolloState } from '@lib'
import { typography, breakpoint, palette } from '@theme'
import { SIDEBAR_DONATORS } from '@gql'
import { ISidebarDonatorsQuery } from '@types'
import { header, alternatingPanels, metrics, tabbedInfo } from '@copy/home'

interface IHome {
  apolloData: {
    ROOT_QUERY: ISidebarDonatorsQuery
  }
}

const Home = ({
  apolloData: {
    ROOT_QUERY: { exampleEntities },
  },
}: IHome) => {
  // note: obviously this is going to come from CMS data
  const FUND_COUNT = 3.2
  const FUND_AMOUNT = 15250
  const FUND_GOAL = 25000
  const FUND_DATE = 'May, 2022'
  const FUND_DEADLINE = '2022-06-30T00:00:00'

  return (
    <Layout>
      <CreateTopUpWallet />

      <Header>
        <h1>{header.title}</h1>
        <h2>{header.subtitle}</h2>
      </Header>

      <StyledPagePadding>
        <Wrapper>
          <FeaturedArt tokenId={1} startDate={new Date()} tagName="Tag Name" />
          <TabbedInfo>
            {Object.keys(tabbedInfo).map(key => (
              <Tab key={`tab-${key}`} label={key}>
                {tabbedInfo[key]}
              </Tab>
            ))}
          </TabbedInfo>
          <Sidebar {...{ exampleEntities, FUND_COUNT, FUND_AMOUNT, FUND_GOAL, FUND_DATE, FUND_DEADLINE }} />
        </Wrapper>
      </StyledPagePadding>

      <AlternatingPanels>
        {alternatingPanels.map((panel, i) => (
          <AlternatingPanel key={`panel-${i}`} {...panel} />
        ))}
      </AlternatingPanels>

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

const StyledPagePadding = styled(props => <PagePadding {...props} />)`
  position: relative;
  padding: 0;
  &:before {
    content: ' ';
    position: absolute;
    width: 100%;
    z-index: 0;
    top: 65px;
    height: 475px;
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      top: 80px;
      height: 675px;
    }
    background-color: ${rgba(palette.moon)};
    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.slate)};
    }
  }
`

const Wrapper = styled.section`
  position: relative;
  display: grid;
  grid-template-areas: 'featuredArt' 'sidebar' 'tabbedInfo';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-areas: 'featuredArt sidebar' 'tabbedInfo sidebar';
    grid-gap: 0px 30px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-gap: 0px 80px;
  }
  padding-bottom: 100px;
`
// todo: above is just a filled-in value, check design

const Tab = styled.div<{ label: string }>``

export async function getStaticProps() {
  const apolloClient = initializeApollo()
  await apolloClient.query({ query: SIDEBAR_DONATORS })
  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default Home
