import React from 'react'
import styled from 'styled-components'
import { Icon } from '@components'
import { rgba } from '@lib'
import { palette, typography, breakpoint } from '@theme'
import GuideCell from './GuideCell'

import guideMap from './guide'

const DonationGuide = () => {
  return (
    <>
      <Wrapper>
        <Headline>How to donate to grants using web3 — a guide</Headline>

        {guideMap.map((item, i) => (
          <GuideCell key={`guidecell-${i}`} {...item} step={i} />
        ))}
      </Wrapper>
      <CloseButton glyph="cross" level={1} />
      <Onionskin />
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 1001;
  top: 125px;
  left: 50px;
  height: calc(100vh - 125px);
  width: calc(100vw - 100px);
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

  background: rgba(255, 255, 255, 0.8);
`

const Headline = styled.h1`
  position: absolute;
  top: 24px;
  left: 24px;
  max-width: 65%;

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

const Onionskin = styled.div`
  z-index: 1000;
`

const CloseButton = styled(props => <Icon {...props} />)`
  position: absolute;
  z-index: 1002;
  top: 100px;
  right: 25px;

  cursor: pointer;
`

export default DonationGuide
