import styled from 'styled-components'
import { Icon } from '@components'
import { palette, breakpoint, typography } from '@theme'
import { rgba } from '@lib'

const FeaturedArt = () => (
  <Wrapper>
    <FeaturedArtworkImage />
    <Copy>
      <Title>Title of Monthly Featured Artwork</Title>
      <Metadata>
        <Metadatum>
          <Icon>face</Icon>Artist Name
        </Metadatum>
        <Metadatum>
          <Icon>calendar</Icon>Created # days ago
        </Metadatum>
        <Metadatum>
          <Icon>tag</Icon>Tag Name
        </Metadatum>
      </Metadata>
    </Copy>
  </Wrapper>
)

const Wrapper = styled.section`
  position: relative;
  grid-area: featuredArt;
  @media only screen and (max-width: ${breakpoint.laptop - 1}px) {
    border-radius: 16px 16px 0px 0px;
    overflow: hidden;
    color: ${rgba(palette.white)};
  }
`

const FeaturedArtworkImage = styled.div`
  width: 100%;
  height: 400px;
  background: blue;
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: ${breakpoint.laptop - 1}px) {
    position: absolute;
    right: 25px;
    bottom: 20px;
  }
`

const Title = styled.div`
  ${typography.title.l4}
`

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-gap: 50px;
  > div {
    min-width: 45%;
  }
  ${typography.label.l1}
`

const Metadatum = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

export default FeaturedArt
