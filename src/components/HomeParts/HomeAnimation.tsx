import styled from 'styled-components'
import { useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { breakpoint } from '@theme'
import { assetPath } from '@lib'

const HomeAnimation = () => {
  const spline = useRef()
  const onLoad = (splineApp: any) => (spline.current = splineApp)
  return (
    <Wrapper>
      <div>
        <Img src={assetPath('/assets/animation-placeholder.png?fm=webp')} />
        <Img src={assetPath('/assets/animation-placeholder-dark.png?fm=webp')} $dark />
        {/* <StyledSpline scene="https://prod.spline.design/LkyNHqmv6VPdWnml/scene.splinecode" onLoad={onLoad} /> */}
        {/* <StyledSpline scene="https://prod.spline.design/TrfVmPw3GkShfJMY/scene.splinecode" onLoad={onLoad} $dark /> */}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  > div {
    width: auto !important;
    height: auto !important;
    position: relative;

    @media only screen and (min-width: ${breakpoint.tablet}px) {
      width: 400px !important;
      height: 400px !important;
    }
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      width: 550px !important;
      height: 550px !important;
    }
    @media only screen and (min-width: ${breakpoint.laptopXL}px) {
      width: 600px !important;
      height: 600px !important;
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      width: 750px !important;
      height: 750px !important;
    }
  }
`

const StyledSpline = styled(props => <Spline {...props} />)<{ $dark?: boolean }>`
  display: ${props => (props.$dark ? 'none' : 'block')};
  @media only screen and (prefers-color-scheme: dark) {
    display: ${props => (props.$dark ? 'block' : 'none')};
  }
  width: calc(100vw - 40px) !important;
  height: calc(100vw - 40px) !important;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    position: absolute;
    left: -50px;
    top: -50px;
    width: 600px !important;
    height: 600px !important;
  }
  @media only screen and (min-width: ${breakpoint.laptopXL}px) {
    width: 700px !important;
    height: 700px !important;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    left: -75px;
    top: -75px;
    width: 800px !important;
    height: 800px !important;
  }
`

const Img = styled.img<{ $dark?: boolean }>`
  display: ${props => (props.$dark ? 'none' : 'block')};
  @media only screen and (prefers-color-scheme: dark) {
    display: ${props => (props.$dark ? 'block' : 'none')};
  }
  width: calc(100vw - 40px) !important;
  height: auto;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    position: absolute;
    z-index: 0;
    left: -50px;
    top: -50px;
    width: 550px !important;
  }
  @media only screen and (min-width: ${breakpoint.laptopXL}px) {
    width: 650px !important;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    left: -75px;
    top: -75px;
    width: 750px !important;
  }
`

export default HomeAnimation
