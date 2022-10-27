import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'ethers'
import { Icon } from '@components'
import { palette, breakpoint, typography } from '@theme'
import { rgba, assert, useReadContract, assetPath, LayoutContext } from '@lib'
import { ArtizenERC1155 } from '@contracts'
import { raffle } from '@copy/home'

type IFeaturedArt = {
  tagName?: string
  tokenId: BigNumber
  startTime: BigNumber
}

interface Metadata {
  name: string
  description: string
  artist: string
  image: string
  attributes: Array<unknown>
}

const FeaturedArt = ({ tokenId, startTime, tagName }: IFeaturedArt) => {
  const { setVisibleModalWithAttrs } = useContext(LayoutContext)

  const { value: metadataUri, refetch: refetchTokenId } = useReadContract(
    assert(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, 'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS'),
    ArtizenERC1155,
    'uri',
    [tokenId],
    false,
  )

  const [metadata, setMetadata] = useState<Metadata>()

  const getMetadataFromUri = async (uri: string) => {
    const response = await fetch(uri)
    const json = await response.json()
    setMetadata(json)
  }

  useEffect(() => {
    if (metadataUri) {
      getMetadataFromUri(metadataUri as string)
    }
  }, [metadataUri])

  useEffect(() => {
    if (tokenId) {
      refetchTokenId?.()
    }
  }, [tokenId])

  const getDaysAgoFromDate = (start: number) => {
    const now = new Date()
    const oneDay = 1000 * 60 * 60 * 24
    const diffInTime = now.getTime() - start * 1000
    const diffInDays = Math.round(diffInTime / oneDay)
    return diffInDays
  }

  // note: current video NFT ratio is 1:.56
  return (
    <Wrapper>
      {/* this src should come from metadata var */}
      <Poster
        src={assetPath(`/assets/elliot-lee-nft-poster.jpg?w=1040&fm=webp`)}
        onClick={() => setVisibleModalWithAttrs?.('media', { videoFile: metadata?.image })}
      />
      <Copy>
        <Title>{raffle.title}</Title>
        <Metadata>
          <Metadatum>
            <Icon glyph="face" level={1} outline label={raffle.artist} />
          </Metadatum>
          <Metadatum>
            <Icon
              glyph="calendar"
              level={1}
              outline
              label={`Created ${getDaysAgoFromDate(startTime?.toNumber())} days ago`}
            />
          </Metadatum>
          {tagName && (
            <Metadatum>
              <Icon glyph="tag" level={1} outline label={tagName} />
            </Metadatum>
          )}
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
    color: ${rgba(palette.white)};
  }

  &:before {
    z-index: 0;
    position: absolute;
    top: 40px;
    left: -24px;
    background-color: ${rgba(palette.moon)};
    width: 100vw;
    height: calc((100% + 247px) - 80px);
    content: '';

    @media only screen and (min-width: ${breakpoint.phablet}px) {
      left: calc((100vw - 508px) / 2 * -1);
    }

    @media only screen and (min-width: ${breakpoint.tablet}px) {
      top: 48px;
      left: calc((100vw - 688px) / 2 * -1);
      height: calc((100% + 247px) - 96px);
    }

    @media only screen and (min-width: ${breakpoint.laptop}px) {
      top: 64px;
      left: calc((100vw - 944px) / 2 * -1);
      height: calc(100% - 32px);
    }

    @media only screen and (min-width: ${breakpoint.laptopXL}px) {
      left: calc((100vw - 1200px) / 2 * -1);
    }

    @media only screen and (min-width: ${breakpoint.desktop}px) {
      top: 80px;
      left: calc((100vw - 1600px) / 2 * -1);
      height: calc(100% - 40px);
    }

    @media (prefers-color-scheme: dark) {
      background-color: ${rgba(palette.slate)};
      border-width: 0.5px 0px;
      border-style: solid;
      border-color: ${rgba(palette.barracuda, 0.4)};
    }
  }
`

const Copy = styled.div`
  position: relative;
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
