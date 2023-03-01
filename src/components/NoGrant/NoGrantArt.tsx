import styled from 'styled-components'
import { palette, breakpoint } from '@theme'
import { rgba } from '@lib'

const NoGrantArt = () => {
  return (
    <Wrapper>
      <Poster src="/assets/noGrant.jpg" />
      <DarkPoster src="/assets/noGrant-dark.jpg" />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  grid-area: featuredArt;

  @media only screen and (max-width: ${breakpoint.laptop - 1}px) {
    border-radius: 16px 16px 0px 0px;
    color: ${rgba(palette.white)};
  }

  min-height: 340px;
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    min-height: 512px;
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    min-height: 320px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    min-height: 440px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    min-height: 760px;
  }
`

const Poster = styled.img`
  position: relative;
  z-index: 1;
  max-width: 100%;
  display: block;
  border-radius: 16px 16px 0 0;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    border-radius: 16px;
  }
  @media only screen and (prefers-color-scheme: dark) {
    display: none;
  }
`

const DarkPoster = styled(props => <Poster {...props} />)`
  display: none;
  @media only screen and (prefers-color-scheme: dark) {
    display: block;
  }
`

export default NoGrantArt
