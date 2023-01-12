import { useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Button, PagePadding } from '@components'
import { rgba, assetPath } from '@lib'
import { palette, typography, breakpoint } from '@theme'
import { applyForFundingBlurb } from '@copy/home'

const ApplyForFundingBlurb = () => {
  const router = useRouter()
  const { title, subhead, trailingHead, tiles, buttonLabel, applyLink, disclaimer } = applyForFundingBlurb
  return (
    <PagePadding>
      <Wrapper>
        <Title>{title}</Title>
        <Subhead>{subhead}</Subhead>
        <TrailingHead>{trailingHead}</TrailingHead>
        <Tiles>
          {tiles.map((tile, index) => (
            <Tile key={`tile-${index}`}>
              <Image image={tile.image} imageDark={tile.imageDark} />
              <TileTitle>{tile.title}</TileTitle>
              <TileDescription>{tile.description}</TileDescription>
            </Tile>
          ))}
        </Tiles>
        <StyledButton level={0} glyph="external" glyphOnRight onClick={() => router.push(applyLink)} stretch>
          {buttonLabel}
        </StyledButton>
        <Disclaimer>{disclaimer}</Disclaimer>
      </Wrapper>
    </PagePadding>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Title = styled.h2`
  ${typography.title.l2}
`

const Subhead = styled.p`
  margin-top: 1em;
  max-width: 508px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    max-width: 688px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    max-width: 760px;
  }
  ${typography.body.l2}
`

const TrailingHead = styled.p`
  margin-top: 1em;
  ${typography.label.l2}
  color: ${rgba(palette.barracuda)};
`

const Tiles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: space-around;
  gap: 32px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
    gap: 24px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    gap: 32px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding: 0 40px;
    gap: 80px;
  }
`

const Tile = styled.li``

const StyledButton = styled(props => <Button {...props} />)`
  margin-top: 40px;
  max-width: 508px;
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    margin-top: 60px;
    max-width: 688px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    margin-top: 75px;
    max-width: 760px;
  }
`

const Disclaimer = styled.p`
  margin-top: 1em;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    margin-top: 2em;
  }
  ${typography.label.l2}
  color: ${rgba(palette.barracuda)};
`

const Image = styled.div<Pick<IAlternatingPanel, 'image' | 'imageDark'>>`
  width: 100%;
  height: 156px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  background-image: url(${props => assetPath(props.image)});
  ${props =>
    props.imageDark &&
    `
    @media (prefers-color-scheme: dark) {
      background-image: url(${assetPath(props.imageDark)});
    }
  `}
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    height: 215px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 295px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 320px;
  }
`

const TileTitle = styled.h3`
  ${typography.title.l3}
`

const TileDescription = styled.p`
  margin-top: 0.5em;
  ${typography.body.l2}
`

export default ApplyForFundingBlurb
