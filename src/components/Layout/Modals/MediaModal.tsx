import { useState, useEffect, useContext } from 'react'
import styled, { css } from 'styled-components'
import { LayoutContext, useCloudinary } from '@lib'

const MediaModal = () => {
  const [loaded, setLoaded] = useState<boolean>()
  const { addParamsToLink } = useCloudinary()
  const { visibleModal, modalAttrs } = useContext(LayoutContext)

  useEffect(() => setLoaded(visibleModal === 'media'), [visibleModal])
  return (
    <Wrapper className={visibleModal === 'media' ? 'visible' : ''}>
      <Content>
        {!!modalAttrs.videoFile && (
          <Video
            loop={true}
            autoPlay={true}
            controls={false}
            muted={false}
            onCanPlay={() => setLoaded(true)}
            className={loaded ? 'visible' : ''}
          >
            <source src={addParamsToLink(modalAttrs.videoFile, 'q_auto', 'video')} type="video/mp4" />
          </Video>
        )}
        {!modalAttrs.videoFile && <Image className={loaded ? 'visible' : ''} src={modalAttrs.imageFile} />}
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

const PopupStyle = css`
  opacity: 0;
  transform: scale(1.1);
  /* transition out timing */
  transition: opacity 0.15s 0s ease-in-out, transform 0.15s 0s ease-in-out;
  max-width: 96vmin;
  max-height: 90vmin;
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

const Video = styled.video`
  ${PopupStyle}
`
const Image = styled.img`
  ${PopupStyle}
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

export default MediaModal
