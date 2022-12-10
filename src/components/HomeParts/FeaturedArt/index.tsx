import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'ethers'
import { Icon } from '@components'
import { palette, breakpoint, typography } from '@theme'
import { rgba, assert, useReadContract, assetPath, LayoutContext } from '@lib'
import { raffle } from '@copy/home'
import { ArtizenArtifactsAbi } from '@contracts'

type IFeaturedArt = {
  grant?: Grant
}

const FeaturedArt = ({ grant }: IFeaturedArt) => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const getDaysAgoFromDate = (start: number) => {
    const now = new Date()
    const oneDay = 1000 * 60 * 60 * 24
    const diffInTime = now.getTime() - start * 1000
    const diffInDays = Math.round(diffInTime / oneDay)
    return diffInDays
  }

  if (!grant?.submission?.artifact) return <></>

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
