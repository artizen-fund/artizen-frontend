import styled from 'styled-components'
import { Icon, Slideshow } from '@components'
import { palette, breakpoint, typography } from '@theme'
import { rgba, assert, useReadContract } from '@lib'
import { useEffect, useState } from 'react'
import { ArtizenERC1155 } from '@contracts'

type IFeaturedArt = {
  tokenId: number
  startDate: Date
  tagName: string
}

interface Metadata {
  name: string
  description: string
  artist: string
  image: string
  attributes: Array<unknown>
}

const FeaturedArt = ({ tokenId, startDate, tagName }: IFeaturedArt) => {
  const [metadataUri] = useReadContract(
    assert(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, 'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS'),
    ArtizenERC1155,
    'uri',
    [tokenId],
  )
  const [metadata, setMetadata] = useState<Metadata>()

  const getMetadataFromUri = async (uri: string) => {
    const response = await fetch(uri)
    const json = await response.json()
    setMetadata(json)
  }

  useEffect(() => {
    if (metadataUri) {
      // TODO: Remove this replace when contract start using ERC1155URIStorage
      const uri = (metadataUri as string).replace('{id}.json', `${tokenId}.json`)
      getMetadataFromUri(uri)
    }
  }, [metadataUri])

  const getDaysAgoFromDate = (start: Date) => {
    const now = new Date()

    const oneDay = 1000 * 60 * 60 * 24

    const diffInTime = now.getTime() - start.getTime()

    const diffInDays = Math.round(diffInTime / oneDay)

    return diffInDays
  }

  return (
    <Wrapper>
      <Slideshow slides={metadata?.image ? [metadata?.image] : []} />
      <Copy>
        <Title>Title of Monthly Featured Artwork</Title>
        <Metadata>
          <Metadatum>
            <Icon glyph="face" level={1} outline label={metadata?.artist} />
          </Metadatum>
          <Metadatum>
            <Icon glyph="calendar" level={1} outline label={`Created ${getDaysAgoFromDate(startDate)} days ago`} />
          </Metadatum>
          <Metadatum>
            <Icon glyph="tag" level={1} outline label={tagName} />
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
