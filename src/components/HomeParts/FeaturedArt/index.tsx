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
          <IconWrapper>
            <Icon color="slate">face</Icon>
          </IconWrapper>
          Artist Name
        </Metadatum>
        <Metadatum>
          <IconWrapper>
            <Icon color="slate">calendar</Icon>
          </IconWrapper>
          Created # days ago
        </Metadatum>
        <Metadatum>
          <IconWrapper>
            <Icon color="slate">tag</Icon>
          </IconWrapper>
          Tag Name
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
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    border-radius: 16px;
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
  gap: 15px;
  > div {
    min-width: 45%;
  }
  ${typography.label.l1}
`

const Metadatum = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
`
const IconWrapper = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${rgba(palette.slate)};
  border-radius: 9999px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 48px;
    width: 48px;
  }
`
export default FeaturedArt
