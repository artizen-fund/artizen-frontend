import { useContext } from 'react'
import styled from 'styled-components'
import { CloseButton } from '@components'
import { rgba, DonationContext } from '@lib'
import { palette, typography, breakpoint } from '@theme'
import { donationGuideMap } from '@copy/home'
import GuideCell from './GuideCell'

const DonationGuide = () => {
  const { visibleModal, toggleModal } = useContext(DonationContext)
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
      <StyledCloseButton glyph="cross" level={1} onClick={() => toggleModal?.()} {...{ visible }} />
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

  font-size: 13px;
  line-height: 120%;
  letter-spacing: -0.4px;

  @media only screen and (min-width: ${breakpoint.phablet}px) {
    grid-column-gap: 16px;
    grid-row-gap: 48px;
    padding: 40px;
  }

  @media only screen and (min-width: 780px) {
    width: 700px;
    left: calc((100vw - 700px) / 2);
    grid-template-columns: repeat(12, 1fr);
    font-size: 14px;
  }

  @media only screen and (min-width: 1044px) {
    width: 1024px;
    left: calc((100vw - 1024px) / 2);
    grid-column-gap: 20px;
    grid-row-gap: 72px;
  }

  @media only screen and (min-width: 1720px) {
    width: 1680px;
    left: calc((100vw - 1680px) / 2);
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

const StyledCloseButton = styled(props => <CloseButton {...props} />)`
  top: 60px;
  right: 0px;
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    top: 100px;
    right: 25px;
  }
`

export default DonationGuide
