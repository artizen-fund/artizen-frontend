import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CloseButton } from '@components'

interface IVideoPopup {
  src?: string
  visible: boolean
  setVisible: (b: boolean) => void
}

const VideoPopup = ({ src, visible, setVisible }: IVideoPopup) => {
  const [loaded, setLoaded] = useState<boolean>()

  useEffect(() => {
    if (!visible) setLoaded(false)
  }, [visible])

  return (
    <>
      <Wrapper className={visible ? 'visible' : ''} onClick={() => setVisible(false)}>
        {visible && (
          <Content>
            <Video
              loop={true}
              autoPlay={true}
              controls={false}
              muted={true}
              onCanPlay={() => setLoaded(true)}
              className={loaded ? 'visible' : ''}
            >
              <source src={src} type="video/mp4" />
            </Video>
            <CloseButton visible={loaded} />
          </Content>
        )}
      </Wrapper>
      <Onionskin className={visible ? 'visible' : ''} onClick={() => setVisible(false)} />
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 104;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Video = styled.video`
  opacity: 0;
  transform: scale(1.1);
  /* transition out timing */
  transition: opacity 0.15s 0s ease-in-out, transform 0.15s 0s ease-in-out;
  max-width: 96vmin;
  max-height: 96vmin;
  &.visible {
    opacity: 1;
    transform: scale(1);
    /* transition in timing */
    transition: opacity 1.5s 1s ease-in-out, transform 1.5s 1s ease-in-out;
    pointer-events: all;
  }
  will-change: opacity;
  border-radius: 16px;
`

// TODO: combine this with system-wide Onionskin
// (requires building into LayoutContext, or whatever we call that)

const Onionskin = styled.div`
  position: fixed;
  z-index: 103;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.15s 0s ease-in-out;
  pointer-events: none;
  &.visible {
    opacity: 1;
    pointer-events: all;
    transition: opacity 1.5s 0.15s ease-in-out;
  }
  will-change: opacity;
`

export default VideoPopup
