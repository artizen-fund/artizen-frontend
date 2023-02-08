import { useContext } from 'react'
import styled from 'styled-components'
import { palette, breakpoint } from '@theme'
import { Shimmer } from '@components'
import { rgba, LayoutContext } from '@lib'
import { IGrantFragment } from '@types'

type IFeaturedArt = {
  grant?: IGrantFragment
  loading: boolean
}

const FeaturedArt = ({ grant, loading }: IFeaturedArt) => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)
  const videoFile = grant?.submission?.artifacts[1].video

  const showModal = () => {
    if (videoFile) {
      setVisibleModalWithAttrs?.('media', {
        videoFile,
      })
    }
  }

  const artworkCommunity = grant?.submission?.artifacts ? grant?.submission?.artifacts[1].artwork : ''

  // note: current video NFT ratio is 1:.56
  return (
    <Wrapper>
      {loading || !grant ? (
        <Shimmer />
      ) : (
        <Poster src={artworkCommunity as string} onClick={() => showModal()} hasVideo={!!videoFile} />
      )}
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

const Poster = styled.img<{ hasVideo: boolean }>`
  position: relative;
  z-index: 1;
  max-width: 100%;
  display: block;
  border-radius: 16px 16px 0 0;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    border-radius: 16px;
  }
  cursor: ${props => (props.hasVideo ? 'pointer' : 'default')};
  &:after {
    content: ' ';
    position: absolute;
    z-index: 1;
    bottom: -4px;
    height: 4px;
    width: 100%;
    background: linear-gradient(90deg, #c2b6dc 0%, #c2b6dc 27.07%, #1acc6c 100%);
  }
`

export default FeaturedArt
