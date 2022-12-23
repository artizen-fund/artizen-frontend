import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba, assetPath } from '@lib'

interface SpinnerProps {
  hidden?: boolean
  absolute?: boolean
  alwaysLight?: boolean
  minHeight?: string
}

const Spinner = ({ hidden = false, alwaysLight, ...props }: SpinnerProps) => {
  return (
    <Canvas className={hidden ? 'hidden' : ''} {...props}>
      <AnimatedSpinner {...{ alwaysLight }} />
    </Canvas>
  )
}

const Canvas = styled.div<SpinnerProps>`
  z-index: 2;
  position: ${props => (props.absolute ? 'absolute' : 'relative')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  ${props =>
    props.minHeight
      ? `
    width: 100%;
    min-height: ${props.minHeight};
    `
      : `
  width: 24px;
  height: 24px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    width: 32px;
    height: 32px;
  }
    `}

  opacity: 1;
  transform: scale3d(1, 1, 1);

  will-change: opacity, transform;
  transition: transform 0.6s 0.15s ease-in-out, opacity 0.6s 0.15s ease-in-out;

  &.hidden {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
  }
`

const AnimatedSpinner = styled.div<SpinnerProps>`
  background-color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    background-color: ${props => rgba(props.alwaysLight ? palette.night : palette.moon)};
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

const SpinnerBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`

export default Spinner
