import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CloseButton, PostDonationData, Share, AlertModal, MediaModal, LoginModal } from '@components'
import { LayoutContext } from '@lib'
import { breakpoint } from '@theme'

const ANIMATION_TIMING = 0.6 // seconds

const Modals = () => {
  const { visibleModal, toggleModal } = useContext(LayoutContext)
  /* In order for the modal to have any kind of fade-out effect, it needs
   *   to persist even when visibleModal is changed in the LayoutContext.
   *
   * So rather than just test and switch visibleModal, we're going to use
   *   that to set a local modal state, which gets unset after transitions
   *   are concluded.
   */
  const [displayedVisibleModal, setDisplayedVisibleModal] = useState<ModalType>()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!visibleModal) {
      setVisible(false)
      setTimeout(() => setDisplayedVisibleModal(undefined), ANIMATION_TIMING * 1000)
    } else {
      setVisible(true)
      setDisplayedVisibleModal(visibleModal)
    }
  }, [visibleModal])

  const renderSwitch = (visibleModal?: ModalType) => {
    switch (displayedVisibleModal) {
      case 'login':
        return <LoginModal />
      case 'postDonationData':
        return <PostDonationData />
      case 'share':
        return <Share />
      case 'alert':
        return <AlertModal headline="derp" message="herp derp derp" />
      case 'media':
        return <MediaModal />
      default:
        return <></>
    }
  }

  return (
    <Wrapper {...{ visible }}>
      <Content>
        {renderSwitch(visibleModal)}
        <CloseButton onClick={() => toggleModal?.()} {...{ visible }} />
      </Content>
    </Wrapper>
  )
}

const Content = styled.div`
  position: relative;
  pointer-events: all;
`

const Wrapper = styled.div<{ visible?: boolean }>`
  position: fixed;
  z-index: 103;
  left: 0;
  width: 100%;

  top: 64px;
  height: calc(100vh - 64px);
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    top: 72px;
    height: calc(100vh - 72px);
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    top: 88px;
    height: calc(100vh - 88px);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: opacity ${ANIMATION_TIMING}s ease-in-out, transform ${ANIMATION_TIMING}s ease-in-out;
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: translateY(${props => (props.visible ? 0 : '100px')};);
  pointer-events: none;
`

export default Modals
