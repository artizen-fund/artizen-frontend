import styled from 'styled-components'
import {
  FeaturedArt,
  Layout,
  Metrics,
  Newsletter,
  PagePadding,
  AlternatingPanels,
  AlternatingPanel,
  Sidebar,
  Curators,
  Button,
} from '@components'
import { rgba, useCampaign, useTabbedInfo, Tabs, TabbedContent } from '@lib'
import { typography, breakpoint, palette } from '@theme'
import { header, alternatingPanels, metrics, tabbedInfo } from '@copy/home'

const Home = () => {
  const { raffle } = useCampaign()

  const tabs = Object.keys(tabbedInfo).map(key => (
    <Tab key={`tab-${key}`} label={key}>
      {tabbedInfo[key]}
    </Tab>
  ))
  const { activeTab, setTab } = useTabbedInfo(tabs, true)

  return (
    <Layout>
      <Header>
        <h1>{header.title}</h1>
        <h2>{header.subtitle}</h2>
      </Header>
      <StyledPagePadding>
        <Wrapper>
          <FeaturedArt tokenId={raffle?.tokenID} startTime={raffle?.startTime} />
          <TabbedInfoWrapper>
            <StyledTabs {...{ activeTab, setTab, tabs }} />
            <TabbedContent {...{ activeTab, tabs }} />
          </TabbedInfoWrapper>
          <Sidebar />
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
      <Curators />
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

const TabbedInfoWrapper = styled.div`
  grid-area: tabbedInfo;
`

const StyledTabs = styled(props => <Tabs {...props} />)`
  margin: 40px 0px 35px 0px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    margin: 50px 0px 45px 0px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    margin: 60px 0px 55px 0px;
  }
`

export default Home
