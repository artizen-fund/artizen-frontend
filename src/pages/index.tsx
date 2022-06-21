import styled from 'styled-components'
import { FeaturedArt, Layout, Metrics, Newsletter, PagePadding, Sidebar, TabbedInfo } from '@components'
import { CreateTopUpWallet, rgba, initializeApollo, addApolloState } from '@lib'
import { typography, breakpoint, palette } from '@theme'
import { SIDEBAR_DONATORS } from '@gql'
import { ISidebarDonatorsQuery } from '@types'

interface IHome {
  apolloData: {
    ROOT_QUERY: ISidebarDonatorsQuery
  }
}

const Home = ({
  apolloData: {
    ROOT_QUERY: { Donations },
  },
}: IHome) => {
  // note: obviously this is going to come from CMS data
  const FUND_COUNT = 3.2
  const FUND_AMOUNT = 15250
  const FUND_GOAL = 25000
  const FUND_DATE = 'May, 2022'
  const FUND_DEADLINE = '2022-06-30T00:00:00'

  const tabbedInfo: Record<string, React.ReactNode> = {
    About: (
      <>
        <h1>Join our May, 2022 donation drive</h1>
        <p>
          Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere
          velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
          elit. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
          dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.
        </p>
        <p>
          Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent
          commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.
        </p>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Fusce
          dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>
        <p>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas sed diam eget risus varius
          blandit sit amet non magna. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Curabitur
          blandit tempus porttitor. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        </p>
      </>
    ),
    Artist: (
      <>
        <h1>So who’s this guy?</h1>
        <p>Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.</p>
      </>
    ),
    Leaderboard: (
      <>
        <h1>Leaderboard leaderboard</h1>
        <p>Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.</p>
      </>
    ),
    Perks: (
      <>
        <h1>Perky Perky Perks</h1>
        <p>Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.</p>
      </>
    ),
  }

  return (
    <Layout>
      <CreateTopUpWallet />

      <Header>
        <h1>We’ve Successfully Raised $1,515,250 For Climate Action</h1>
        <h2>
          Join us in building the world’s largest web3 fund for public goods. 100% transparent, easy to take part in,
          and profitable for everyone.
        </h2>
      </Header>

      <StyledPagePadding>
        <Wrapper>
          <FeaturedArt />
          <TabbedInfo>
            {Object.keys(tabbedInfo).map(key => (
              <Tab key={`tab-${key}`} label={key}>
                {tabbedInfo[key]}
              </Tab>
            ))}
          </TabbedInfo>
          <Sidebar {...{ Donations, FUND_COUNT, FUND_AMOUNT, FUND_GOAL, FUND_DATE, FUND_DEADLINE }} />
        </Wrapper>
      </StyledPagePadding>

      <Newsletter />
      <Metrics />
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
