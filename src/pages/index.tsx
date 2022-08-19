import styled from 'styled-components'
import {
  FeaturedArt,
  Layout,
  Metrics,
  Newsletter,
  PagePadding,
  TabbedInfo,
  AlternatingPanels,
  AlternatingPanel,
  Sidebar,
} from '@components'
import { assert, rgba, useReadContract } from '@lib'
import { typography, breakpoint, palette } from '@theme'
import { header, alternatingPanels, metrics, tabbedInfo } from '@copy/home'
import raffleAbi from 'src/contracts/RaffleAbi'
import { useEffect, useState } from 'react'
import { ShelfType } from 'src/components/Layout/Header'

const Home = () => {
  const FUND_GOAL = 25000
  const [visibleShelf, setVisibleShelf] = useState<ShelfType>()

  const raffleContractAddress = assert(
    process.env.NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS,
    'NEXT_PUBLIC_RAFFLE_CONTRACT_ADDRESS',
  )
  const { value: raffleId } = useReadContract(raffleContractAddress, raffleAbi, 'raffleCount', [])

  const { value: raffle, refetch: refetchRaffle } = useReadContract(
    raffleContractAddress,
    raffleAbi,
    'getRaffle',
    [raffleId],
    false,
  )

  useEffect(() => {
    refetchRaffle()
  }, [raffleId])

  return (
    <Layout visibleShelf={visibleShelf} setVisibleShelf={setVisibleShelf}>
      <Header>
        <h1>{header.title}</h1>
        <h2>{header.subtitle}</h2>
      </Header>
      <StyledPagePadding>
        <Wrapper>
          <FeaturedArt tokenId={raffle?.tokenID} startTime={raffle?.startTime} tagName="Tag Name" />
          <TabbedInfo>
            {Object.keys(tabbedInfo).map(key => (
              <Tab key={`tab-${key}`} label={key}>
                {tabbedInfo[key]}
              </Tab>
            ))}
          </TabbedInfo>
          <Sidebar {...{ raffle, FUND_GOAL, visibleShelf }} />
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

export default Home
