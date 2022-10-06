import React from 'react'
import styled from 'styled-components'
import { rgba, assetPath } from '@lib'
import { palette, breakpoint } from '@theme'
import { IDonationGuideCell, DonationGuideCoordinate } from '@copy/home'

const GuideCell = ({ columns, height, items, step }: IDonationGuideCell & { step: number }) => (
  <Wrapper {...{ columns, height }}>
    {items.map((item, i) =>
      item.type === 'copy' ? (
        <CellItem key={`guide-cell-${step}-${i}`} coordinates={item.coordinates} type={item.type}>
          {i === 0 && <StepNumber>{step + 1}</StepNumber>}
          <p>{item.copy}</p>
        </CellItem>
      ) : item.type === 'image' ? (
        <CellItem key={`guide-cell-${step}-${i}`} coordinates={item.coordinates} type={item.type}>
          <img src={`${assetPath(`/assets/illustrations/guide/${item.image}`)}?fm=webp`} />
        </CellItem>
      ) : (
        <>{/* todo: Lottie animation support */}</>
      ),
    )}
  </Wrapper>
)

const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  min-height: 32px;

  background-image: url(${assetPath('/assets/step-background.png')});
  background-repeat: no-repeat;
  background-size: contain;

  font-family: 'roc-grotesk';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${rgba(palette.night)};
`

const getCoordinate = (n: number, axis: 'x' | 'y') => {
  if (axis === 'x' && n < 0) {
    return `right: ${n * -1}%`
  }
  if (axis === 'x') {
    return `left: ${n}%`
  }
  if (n < 0) {
    return `bottom: ${n * -1}%`
  }
  return `top: ${n}%`
}

const getWidth = (cellType: string, n?: number) => {
  if (!n) {
    return '100%'
  }
  if (cellType === 'copy') {
    return `${n}px`
  }
  return `${n}%`
}

const CellItem = styled.div<{ coordinates: DonationGuideCoordinate; type: string }>`
  position: absolute;
  z-index: ${props => (props.type === 'copy' ? 1 : 2)};

  @media only screen and (max-width: ${breakpoint.phablet - 1}px) {
    ${props => getCoordinate(props.coordinates.mobile.x, 'x')};
    ${props => getCoordinate(props.coordinates.mobile.y, 'y')};
    width: ${props => getWidth(props.type, props.coordinates.mobile.w)};
  }
  @media only screen and (min-width: ${breakpoint.phablet}px) and (max-width: ${breakpoint.tablet - 1}px) {
    ${props => getCoordinate(props.coordinates.phablet.x, 'x')};
    ${props => getCoordinate(props.coordinates.phablet.y, 'y')};
    width: ${props => getWidth(props.type, props.coordinates.phablet.w)};
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) and (max-width: ${breakpoint.laptop - 1}px) {
    ${props => getCoordinate(props.coordinates.tablet.x, 'x')};
    ${props => getCoordinate(props.coordinates.tablet.y, 'y')};
    width: ${props => getWidth(props.type, props.coordinates.tablet.w)};
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) and (max-width: ${breakpoint.desktop - 1}px) {
    ${props => getCoordinate(props.coordinates.laptop.x, 'x')};
    ${props => getCoordinate(props.coordinates.laptop.y, 'y')};
    width: ${props => getWidth(props.type, props.coordinates.laptop.w)};
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    ${props => getCoordinate(props.coordinates.desktop.x, 'x')};
    ${props => getCoordinate(props.coordinates.desktop.y, 'y')};
    width: ${props => getWidth(props.type, props.coordinates.desktop.w)};
  }

  img {
    object-fit: contain;
    max-width: 100%;
  }

  ${props =>
    props.type === 'copy' &&
    `
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 5px;
  `}

  p {
    display: flex;

    background: #f1f3ee;
    border-radius: 16px;
    padding: 12px;

    font-family: 'roc-grotesk';
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    letter-spacing: -0.4px;
    @media only screen and (min-width: ${breakpoint.phablet}px) {
      padding: 14px;
      font-size: 13px;
    }
    @media only screen and (min-width: ${breakpoint.tablet}px) {
      padding: 14px;
      font-size: 14px;
    }
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      padding: 16px;
      font-size: 14px;
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      padding: 32px;
      font-size: 20px;
    }
  }

  color: ${rgba(palette.night)} !important;
`

/* TODO: note that these height calculations are off
 * actual calculation is (100vw - margin of popup - padding of popup) * height multiplier
 * I'll come around to this.
 */

const Wrapper = styled.div<Pick<IDonationGuideCell, 'columns' | 'height'>>`
  position: relative;
  grid-column-end: span ${props => props.columns.mobile};
  height: calc((100vw - 40px) * ${props => props.height.mobile});

  @media only screen and (min-width: ${breakpoint.phablet}px) {
    grid-column-end: span ${props => props.columns.phablet};
    height: calc((100vw - 40px) * ${props => props.height.phablet});
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-column-end: span ${props => props.columns.tablet};
    height: ${props => props.height.tablet}px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-column-end: span ${props => props.columns.laptop};
    height: ${props => props.height.laptop}px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-column-end: span ${props => props.columns.desktop};
    height: ${props => props.height.desktop}px;
  }
`

export default GuideCell
