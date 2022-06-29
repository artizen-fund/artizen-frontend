import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba, assetPath } from '@lib'

export interface SpinnerProps {
  hidden?: boolean
}

const Spinner = ({ hidden = false }: SpinnerProps) => (
  <Wrapper className={hidden ? 'hidden' : ''}>
    <AnimatedSpinner />
  </Wrapper>
)

const Wrapper = styled.div`
  z-index: 2;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 24px;
  height: 24px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 32px;
    height: 32px;
  }

  opacity: 1;
  transform: scale3d(1, 1, 1);

  will-change: opacity, transform;
  transition: transform 0.6s 0.15s ease-in-out, opacity 0.6s 0.15s ease-in-out;

  &.hidden {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
  }
`

const AnimatedSpinner = styled.div`
  background-color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.moon)};
  }
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  mask-image: url(${assetPath('/assets/spinner.svg')});
  width: 24px;
  height: 24px;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    mask-image: url(${assetPath('/assets/spinnerLarge.svg')});
    width: 32px;
    height: 32px;
  }

  backface-visibility: hidden;
  will-change: transform;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`

export default Spinner
