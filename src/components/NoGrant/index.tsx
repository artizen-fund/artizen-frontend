import styled from 'styled-components'
import { breakpoint } from '@theme'
import NoGrantArt from './NoGrantArt'
import NoGrantSidebar from './NoGrantSidebar'
import { PagePadding } from '@components'

interface INoGrant {
  startDate?: string
}

const NoGrant = ({ startDate }: INoGrant) => (
  <PagePadding>
    <Wrapper>
      <NoGrantArt />
      <NoGrantSidebar />
    </Wrapper>
  </PagePadding>
)

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

export { NoGrant }
