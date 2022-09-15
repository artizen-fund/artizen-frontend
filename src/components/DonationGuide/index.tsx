import React from 'react'
import styled from 'styled-components'
import { Icon } from '@components'
import { rgba } from '@lib'
import { palette, typography, breakpoint } from '@theme'
import { donationGuideMap } from '@copy/home'
import GuideCell from './GuideCell'

interface IDonationGuide {
  visible: boolean
  hide: () => void
}

const DonationGuide = ({ visible, hide }: IDonationGuide) => {
  return (
    <>
      <Wrapper {...{ visible }}>
        <Headline>
          How to donate to grants
          <br />
          using web3 — a guide
        </Headline>

        {donationGuideMap.map((item, i) => (
          <GuideCell key={`guidecell-${i}`} {...item} step={i} />
        ))}
      </Wrapper>
      <CloseButton glyph="cross" level={1} onClick={() => hide()} {...{ visible }} />
    </>
  )
}

type VisibilityParam = {
  visible: boolean
}

const Wrapper = styled.div<VisibilityParam>`
  position: fixed;
  z-index: 102;
  left: 20px;
  top: 75px;
  width: calc(100vw - 40px);
  height: calc(100vh - 75px);
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    left: 50px;
    top: 125px;
    width: calc(100vw - 100px);
    height: calc(100vh - 125px);
  }
  overflow-y: scroll;

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 12px;
  grid-row-gap: 32px;
  padding: 24px;

  @media only screen and (min-width: ${breakpoint.phablet}px) {
    grid-column-gap: 16px;
    grid-row-gap: 48px;
    padding: 40px;
  }

  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-template-columns: repeat(12, 1fr);
  }

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-column-gap: 20px;
    grid-row-gap: 72px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-column-gap: 25px;
    grid-row-gap: 80px;
    padding: 80px;
  }

  background: white;

  transition: opacity 0.25s ease-in-out, transform 0.3s ease-in-out;
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? 0 : '100px')};);
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
`

const Headline = styled.h1`
  position: absolute;
  z-index: 3;
  top: 24px;
  left: 24px;

  @media only screen and (min-width: ${breakpoint.phablet}px) {
    top: 40px;
    left: 40px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 80px;
    left: 80px;
  }

  ${typography.title.l1}
  color: ${rgba(palette.black)};
`

const CloseButton = styled(props => <Icon {...props} />)<VisibilityParam>`
  position: absolute;
  z-index: 1002;
  top: 60px;
  right: 0px;
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    top: 100px;
    right: 25px;
  }

  cursor: pointer;
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
`

export default DonationGuide
