import styled from 'styled-components'
import { rgba } from '@lib'
import { palette } from '@theme'

interface ShimmerProps {
  height?: string
}

const Shimmer = (props: ShimmerProps) => (
  <Wrapper {...props}>
    <Cell />
  </Wrapper>
)

const Wrapper = styled.div<ShimmerProps>`
  display: block;
  position: relative;
  height: ${props => props.height || '100%'};
  width: 0px;
  @keyframes fullView {
    100% {
      width: 100%;
    }
  }
  animation: fullView 0.5s forwards linear;
`

const Cell = styled.div`
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  background: linear-gradient(
    90deg,
    ${rgba(palette.stone, 0.12)} 0%,
    ${rgba(palette.stone, 0.12)} 0.01%,
    ${rgba(palette.stone, 0.64)} 35.42%,
    ${rgba(palette.stone, 0.64)} 41.15%,
    ${rgba(palette.stone, 0.12)} 99.99%,
    ${rgba(palette.stone, 0.24)} 100%,
    ${rgba(palette.stone, 0.12)} 100%
  );
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      90deg,
      ${rgba(palette.barracuda, 0.12)} 0%,
      ${rgba(palette.barracuda, 0.12)} 0.01%,
      ${rgba(palette.barracuda, 0.64)} 35.42%,
      ${rgba(palette.barracuda, 0.64)} 41.15%,
      ${rgba(palette.barracuda, 0.12)} 99.99%,
      ${rgba(palette.barracuda, 0.24)} 100%,
      ${rgba(palette.barracuda, 0.12)} 100%
    );
  }
  border-radius: 16px;

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  animation: shimmer 2s infinite;

  background-size: 1000px 100%;
`

export default Shimmer
