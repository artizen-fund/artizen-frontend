import styled from 'styled-components'
import { Icon, Slideshow } from '@components'
import { palette, breakpoint, typography } from '@theme'
import { rgba } from '@lib'

const FeaturedArt = () => {
  const sampleSlides = ['/images/sample-art-1.jpg', '/images/sample-art-2.jpg', '/images/sample-art-3.jpg']
  return (
    <Wrapper>
      <Slideshow slides={sampleSlides} />
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
}

const Wrapper = styled.section`
  position: relative;
  grid-area: featuredArt;
  @media only screen and (max-width: ${breakpoint.laptop - 1}px) {
    border-radius: 16px 16px 0px 0px;
    overflow: hidden;
    color: ${rgba(palette.white)};
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
