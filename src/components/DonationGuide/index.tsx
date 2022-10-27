import { useContext } from 'react'
import styled from 'styled-components'
import { LayoutContext } from '@lib'
import { typography, breakpoint } from '@theme'
import { donationGuideMap } from '@copy/donationGuide'
import GuideCell from './GuideCell'

const DonationGuide = () => {
  const { visibleModal, toggleModal } = useContext(LayoutContext)
  const visible = visibleModal === 'donationGuide'
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
    </>
  )
}

type VisibilityParam = {
  visible: boolean
}

const Wrapper = styled.div<VisibilityParam>`
  position: relative;
  width: calc(100vw - 40px);
  height: calc(100vh - 64px);
  border-radius: 8px 8px 0 0;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: calc(100vw - 40px);
    height: calc(100vh - 72px);
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    width: calc(100vw - 100px);
    height: calc(100vh - 88px);
  }
  overflow-y: scroll;

  display: grid;
  grid-template-rows: auto;
  grid-column-gap: 12px;
  grid-row-gap: 32px;
  padding: 24px;

  font-size: 13px;
  line-height: 120%;
  letter-spacing: -0.4px;

  @media only screen and (min-width: 480px) {
    grid-column-gap: 16px;
    grid-row-gap: 48px;
    padding: 40px;
  }

  @media only screen and (min-width: 780px) {
    width: 700px;
    grid-template-columns: repeat(12, 1fr);
    font-size: 14px;
  }

  @media only screen and (min-width: 1044px) {
    width: 1024px;
    grid-column-gap: 20px;
    grid-row-gap: 72px;
  }

  @media only screen and (min-width: 1720px) {
    width: 1680px;
    grid-column-gap: 25px;
    grid-row-gap: 80px;
    padding: 80px;
    font-size: 20px;
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

  @media only screen and (min-width: ${breakpoint.mobile}px) {
    top: 40px;
    font-size: 30px;
    line-height: 32px;
  }

  @media only screen and (min-width: ${breakpoint.phablet}px) {
    top: 40px;
    left: 40px;
  }

  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 80px;
    left: 80px;
  }

  ${typography.title.l1}
  @media only screen and (min-width: ${breakpoint.laptop}px) and (max-width: 1719px) {
    top: 40px;
    font-size: 48px;
    line-height: 52px;
  }
`

export default DonationGuide
