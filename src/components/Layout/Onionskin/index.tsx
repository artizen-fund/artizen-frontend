import { useContext } from 'react'
import styled from 'styled-components'
import { LayoutContext } from '@lib'

const Onionskin = () => {
  const { visibleShelf, toggleShelf, visibleModal, toggleModal, locked } = useContext(LayoutContext)
  const onClick = () => {
    if (locked) return
    toggleShelf?.()
    toggleModal()
  }
  return (
    <Wrapper className={!!visibleShelf || !!visibleModal ? 'visible' : ''} onClick={onClick} isModal={!!visibleModal} />
  )
}

/* Note: why do we use classNames instead of props.visibleShelf?
 * CSS can't dynamically handle timing changes (transition 0s -> 0.15s), it can only deal with that via class changes.
 *
 * What is isModal? determines whether it is above or below the menu bar
 */

const Wrapper = styled.div<{ isModal?: boolean }>`
  position: fixed;
  z-index: ${props => (props.isModal ? 102 : 100)};
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
