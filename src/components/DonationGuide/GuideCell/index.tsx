import { useEffect } from 'react'
import styled from 'styled-components'
import { LottieAnimation } from '@components'
import { rgba } from '@lib'
import { palette, breakpoint } from '@theme'
import { GuideCell, GuideCoordinate } from '../guide'

const GuideCell = ({ columns, height, items, step }: GuideCell & { step: number }) => (
  <Wrapper {...{ columns, height }}>
    {items.map((item, i) =>
      item.type === 'copy' ? (
        <CellItem key={`guide-cell-${step}-${i}`} coordinates={item.coordinates} type={item.type} numbered={i === 0}>
          <p>{item.copy}</p>
        </CellItem>
      ) : item.type === 'image' ? (
        <CellItem key={`guide-cell-${step}-${i}`} coordinates={item.coordinates} type={item.type}>
          <img src={`/assets/illustrations/guide/${item.image}`} />
        </CellItem>
      ) : (
        <CellItem key={`guide-cell-${step}-${i}`} coordinates={item.coordinates} type={item.type}>
          <LottieAnimation key={`guide-cell-${step}-${i}`} />
        </CellItem>
      ),
    )}
  </Wrapper>
)

const CellItem = styled.div<{ coordinates: GuideCoordinate; type: string; numbered: boolean }>`
  position: absolute;
  z-index: ${props => (props.type === 'copy' ? 1 : 2)};
  left: ${props => props.coordinates.mobile.x}%;
  top: ${props => props.coordinates.mobile.y}%;
  width: ${props => props.coordinates.mobile.w || 100}${props => (props.type === 'copy' ? 'px' : '%')};
  outline: 1px dashed red;
  @media only screen and (min-width: ${breakpoint.phablet}px) {
    left: ${props => props.coordinates.phablet.x}%;
    top: ${props => props.coordinates.phablet.y}%;
    width: ${props => props.coordinates.phablet.w || 100}${props => (props.type === 'copy' ? 'px' : '%')};
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    left: ${props => props.coordinates.tablet.x}%;
    top: ${props => props.coordinates.tablet.y}%;
    width: ${props => props.coordinates.tablet.w || 100}${props => (props.type === 'copy' ? 'px' : '%')};
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    left: ${props => props.coordinates.laptop.x}%;
    top: ${props => props.coordinates.laptop.y}%;
    width: ${props => props.coordinates.laptop.w || 100}${props => (props.type === 'copy' ? 'px' : '%')};
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    left: ${props => props.coordinates.desktop.x}%;
    top: ${props => props.coordinates.desktop.y}%;
    width: ${props => props.coordinates.desktop.w || 100}${props => (props.type === 'copy' ? 'px' : '%')};
  }

  img {
    object-fit: contain;
    max-width: 100%;
  }

  ${props =>
    props.type === 'copy' &&
    `
    padding: 32px;
    background: #F1F3EE;
    border-radius: 16px;
  `}

  p {
    font-family: 'roc-grotesk';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 120%;
    letter-spacing: -0.4px;
  }

  color: ${rgba(palette.night)} !important;

  ${props =>
    props.numbered &&
    `
    &:before {
      content: '1';
      position: absolute;
      left: -20px;
      top: 0;
      outline: 2px solid black;
    }
  `}
`

/* TODO: note that these height calculations are off
 * actual calculation is (100vw - margin of popup - padding of popup) * height multiplier
 * I'll come around to this.
 */

const Wrapper = styled.div<Pick<GuideCell, 'columns' | 'height'>>`
  position: relative;
  grid-column-end: span ${props => props.columns.mobile};
  height: calc((100vw - 40px) * ${props => props.height.mobile});
  outline: 1px dashed blue;

  @media only screen and (min-width: ${breakpoint.phablet}px) {
    grid-column-end: span ${props => props.columns.phablet};
    height: calc((100vw - 40px) * ${props => props.height.phablet});
  }
  @media only screen and (min-width: ${breakpoint.tablet}px) {
    grid-column-end: span ${props => props.columns.tablet};
    height: calc((100vw - 40px) * ${props => props.height.tablet});
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    grid-column-end: span ${props => props.columns.laptop};
    height: calc((100vw - 40px) * ${props => props.height.laptop});
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    grid-column-end: span ${props => props.columns.desktop};
    height: calc((100vw - 40px) * ${props => props.height.desktop});
  }
`

export default GuideCell
