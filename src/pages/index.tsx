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
            <StyledTabbedContent {...{ activeTab, tabs }} />
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
`

const Wrapper = styled.section`
  position: relative;
  display: grid;
  grid-template-areas: 'featuredArt' 'sidebar' 'tabbedInfo';
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-template-columns: auto 390px;
    grid-template-areas: 'featuredArt sidebar' 'tabbedInfo sidebar';
    grid-gap: 0px 30px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-template-columns: auto 480px;
    grid-gap: 0px 80px;
  }
  padding-bottom: 100px;

  &:before {
    content: ' ';
    position: absolute;
    z-index: 0;
    width: 100vw;
    height: 475px;
    top: 65px;
    left: -24px;
    @media only screen and (min-width: ${breakpoint.phablet}px) {
      left: -24px;
    }
    @media only screen and (min-width: ${breakpoint.tablet}px) {
      left: calc((100vw - 688px) / 2 * -1);
    }
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      display: none;
    }
    background-color: ${rgba(palette.moon)};
    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.slate)};
      border-width: 0.5px 0px;
      border-style: solid;
      border-color: ${rgba(palette.barracuda, 0.4)};
    }
  }
`
// todo: above is just a filled-in value, check design

const Tab = styled.div<{ label: string }>``

const TabbedInfoWrapper = styled.div`
  grid-area: tabbedInfo;
`

const StyledTabbedContent = styled(props => <TabbedContent {...props} />)`
  h1 {
    ${typography.title.l2}
    margin-bottom: 0.125em;
  }
  h2 {
    ${typography.label.l1}
    color: ${rgba(palette.barracuda)};
    margin-bottom: 1em;
  }
  p,
  li {
    ${typography.body.l2}
    margin-bottom: 1em;
  }
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
