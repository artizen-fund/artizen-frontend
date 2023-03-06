import styled from 'styled-components'
import { useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { breakpoint } from '@theme'

const HomeAnimation = () => {
  const spline = useRef()
  const onLoad = (splineApp: any) => (spline.current = splineApp)
  return (
    <Wrapper>
      <Spline scene="https://prod.spline.design/okXMrkvtXW9y1Q9b/scene.splinecode" onLoad={onLoad} />
    </Wrapper>
  )
}

// .682

const Wrapper = styled.div`
  > div {
    width: auto !important;
    height: auto !important;
    canvas {
      width: calc(100vw - 40px) !important;
      height: calc(68vw - 40px) !important;
      @media only screen and (min-width: ${breakpoint.tablet}px) {
        width: 400px !important;
        height: calc(400px * 0.682) !important;
      }
      @media only screen and (min-width: ${breakpoint.laptop}px) {
        width: 550px !important;
        height: calc(550px * 0.682) !important;
      }
      @media only screen and (min-width: ${breakpoint.laptopXL}px) {
        width: 600px !important;
        height: calc(600px * 0.682) !important;
      }
      @media only screen and (min-width: ${breakpoint.desktop}px) {
        width: 750px !important;
        height: 512px !important;
      }
    }
  }
`

export default HomeAnimation
