import styled from 'styled-components'
import { useContext } from 'react'
import { Shimmer, LeaderboardHeader, PagePadding } from '@components'
import { range } from 'lodash'
import { breakpoint, palette } from '@theme'
import { rgba, SeasonSubcriptionContext } from '@lib'

const HomeLoadingShimmer = () => {
  const { loading, season, totalPrizePooled, seasonIsActive } = useContext(SeasonSubcriptionContext)
  return (
    <>
      <LeaderboardHeader
        loading={loading}
        index={season?.index}
        endingDate={season?.endingDate}
        totalPrizePooled={totalPrizePooled}
        seasonIsActive={seasonIsActive}
      />
      <StyledPagePadding>
        <FauxGrid>
          {range(0, 6).map((_, i) => (
            <FauxProjectCard key={`faux-cell-${i}`}>
              <Shimmer height="30px" />
              <Shimmer height="70px" />
              <Image />
              <Shimmer height="70px" />
            </FauxProjectCard>
          ))}
        </FauxGrid>
      </StyledPagePadding>
    </>
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

const FauxGrid = styled.div`
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

const FauxProjectCard = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'art' 'copy' 'footer';
  gap: 20px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-areas: 'copy' 'art' 'footer';
    padding: 40px;
  }
  background-color: ${rgba(palette.white)};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.slate)};
  }
`

const Image = styled(props => <Shimmer {...props} />)`
  object-fit: cover;
  width: 100%;
  height: auto;
  background: ${rgba(palette.algae)};
  border-radius: 16px 16px 0 0;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    border-radius: 16px;
    width: 382px;
    height: 382px;
  }
  @media only screen and (min-width: ${breakpoint.laptopXL}px) {
    width: 300px;
    height: 300px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: 440px;
    height: 440px;
  }
  cursor: pointer;
`

export default HomeLoadingShimmer
