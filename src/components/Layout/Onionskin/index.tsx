import { useContext } from 'react'
import styled from 'styled-components'
import { DonationContext } from '@lib'

const Onionskin = () => {
  const { visibleShelf, toggleShelf, visibleModal, toggleModal } = useContext(DonationContext)
  const onClick = () => {
    toggleShelf?.()
    toggleModal?.()
  }
  return <Wrapper className={!!visibleShelf || !!visibleModal ? 'visible' : ''} onClick={onClick} />
}

/* Note: why do we use classNames instead of props.visibleShelf?
 * CSS can't dynamically handle timing changes (transition 0s -> 0.15s),
 *  it can only deal with that via class changes.
 */

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
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

export default Onionskin
