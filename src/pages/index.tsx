import styled from 'styled-components'
import type { NextPage } from 'next'
import { FeaturedArt, Layout, Metrics, Newsletter, PagePadding, Sidebar, StickyCanvas, TabbedInfo } from '@components'
import { CreateTopUpWallet } from '@lib'
import { typography, breakpoint } from '@theme'

const Home: NextPage = () => {
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

      <PagePadding>
        <StickyCanvas>
          <DryContent>
            <FeaturedArt />

            <TabbedInfo>
              <Tab label="About">
                <h1>Join our May, 2022 donation drive</h1>
                <p>
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus
                  posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia
                  odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue
                  laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </p>
                <p>
                  Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna
                  mollis euismod.
                </p>
                <p>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Fusce
                  dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet
                  risus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
                  elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas sed diam eget risus
                  varius blandit sit amet non magna. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                  Curabitur blandit tempus porttitor. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                </p>
              </Tab>
              <Tab label="Artist">
                <h1>So who’s this guy?</h1>
                <p>Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.</p>
              </Tab>
              <Tab label="Leaderboard">
                <h1>Leaderboard leaderboard</h1>
                <p>Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.</p>
              </Tab>
              <Tab label="Perks">
                <h1>Perky Perky Perks</h1>
                <p>Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.</p>
              </Tab>
            </TabbedInfo>
          </DryContent>
          <Sidebar />
        </StickyCanvas>
      </PagePadding>

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

const DryContent = styled.div`
  width: 100%;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 520px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 1020px;
  }
  min-height: 80vh;
`

const Tab = styled.div<{ label: string }>``

export default Home
