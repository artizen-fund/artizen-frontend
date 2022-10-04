import { useState } from 'react'
import styled from 'styled-components'
import useInterval from 'react-useinterval'
import { breakpoint } from '@theme'

interface ISlideshow {
  slides: Array<string>
}

const Slideshow = ({ slides }: ISlideshow) => {
  const SLIDESHOW_SPEED = 5 /* seconds */

  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  useInterval(
    () => setActiveProjectIndex(activeProjectIndex >= (slides?.length || 1) - 1 ? 0 : activeProjectIndex + 1),
    SLIDESHOW_SPEED * 1000,
  )

  return (
    <Wrapper>
      {slides.length > 0 && slides[0].length > 0 && (
        <video loop={true} autoPlay={true} controls={false} muted={true}>
          <source src={slides[0]} type="video/mp4" />
        </video>
      )}
      {/*slides.map((image: string, index: number) => (
        <Slide key={`slide_${index}`} {...{ image }} className={index === activeProjectIndex ? 'active' : 'inactive'} />
      ))*/}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;

  @media only screen and (min-width: ${breakpoint.laptop}px) {
    border-radius: 16px;
    will-change: transform; /* necessary to round corners over transformed children */
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 600px;
  }
`

const Slide = styled.div<{ image: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});

  &.active {
    z-index: 0;
    opacity: 1 !important;
    transform: translateX(0vw);
    transition: opacity 0s 0s ease-in-out, transform 0s 0s ease-in-out;
  }
  &.inactive {
    z-index: 1;
    opacity: 0 !important;
    transform: translateX(-100vw);
    transition: opacity 0.5s 0s ease-in-out, transform 0.6s 0s ease-in-out;
  }
  will-change: opacity, transform;
`

export default Slideshow
