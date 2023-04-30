import styled from 'styled-components'
import { Shimmer, LeaderboardHeader, PagePadding } from '@components'
import { range } from 'lodash'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

const ProjectCardShimmer = () => (
  <Wrapper>
    <Image />
    <AllCopy>
      <Shimmer height="40px" />
      <Shimmer height="40px" />
    </AllCopy>
  </Wrapper>
)

const AllCopy = styled.div`
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Wrapper = styled.article`
  grid-area: card;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen an (min-width: ${breakpoint.tablet}px) {
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
  border-radius: 16px 16px 0 0 !important;

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

export default ProjectCardShimmer
