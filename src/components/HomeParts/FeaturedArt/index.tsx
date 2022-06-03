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
          <Icon glyph="face" level={1} outline label="Artist Name" />
        </Metadatum>
        <Metadatum>
          <Icon glyph="calendar" level={1} outline label="Created # days ago" />
        </Metadatum>
        <Metadatum>
          <Icon glyph="tag" level={1} outline label="Tag Name" />
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/images/sample-art.jpg');
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    border-radius: 16px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 600px;
  }
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
  margin: 1em 0;
`

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  ${typography.label.l1}
`

const Metadatum = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
`

export default FeaturedArt
