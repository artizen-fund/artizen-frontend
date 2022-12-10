import styled from 'styled-components'
import { palette, breakpoint } from '@theme'
import { rgba } from '@lib'

type IFeaturedArt = {
  grant?: Grant
}

const FeaturedArt = ({ grant }: IFeaturedArt) => {
  if (!grant?.submission?.artifact) return <> </>

  const artworkCommunity = grant?.submission?.artifact ? grant?.submission?.artifact?.artworkCommunity : ''

  // note: current video NFT ratio is 1:.56
  return (
    <Wrapper>
      <Poster src={artworkCommunity as string} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  grid-area: featuredArt;

  @media only screen and (max-width: ${breakpoint.laptop - 1}px) {
    border-radius: 16px 16px 0px 0px;
    color: ${rgba(palette.white)};
    &:after {
      content: ' ';
      position: absolute;
      z-index: 1;
      bottom: -4px;
      height: 4px;
      width: 100%;
      background: linear-gradient(90deg, #c2b6dc 0%, #c2b6dc 27.07%, #1acc6c 100%);
    }
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
  cursor: pointer;
`

export default FeaturedArt
