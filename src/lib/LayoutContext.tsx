import { createContext, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { loggedInUserVar, isServer } from '@lib'

/* TODO: rename this
 *  candidates:
 *    - uiContext
 *    - layoutContext
 *    - siteLayoutContext
 */

export type DonationStatus = 'initiated' | 'processing' | 'completed' | ''

interface ILayoutContext {
  visibleShelf?: HeaderShelfType
  setVisibleShelf: (shelf: HeaderShelfType) => void
  toggleShelf: (shelf?: HeaderShelfType) => void
  visibleModal?: ModalType
  setVisibleModal: (modal: ModalType) => void
  toggleModal: (modal?: ModalType) => void
  setVisibleModalWithAttrs: (modalType: ModalType, options: any) => void
  modalAttrs?: any
  locked?: boolean
  setLocked: (b: boolean) => void
  // TODO: modalAttrs?: MediaAttrs | whatever-else
}

const placeholderFunction = () => void 0

export const LayoutContext = createContext<ILayoutContext>({
  toggleModal: placeholderFunction,
  setLocked: placeholderFunction,
  setVisibleModalWithAttrs: placeholderFunction,
  setVisibleModal: placeholderFunction,
  toggleShelf: placeholderFunction,
  setVisibleShelf: placeholderFunction,
})

export const LayoutContextProvider = ({ children }: SimpleComponentProps) => {
  const [visibleShelf, setVisibleShelf] = useState<HeaderShelfType>()
  const toggleShelf = (shelf?: HeaderShelfType) => setVisibleShelf(shelf === visibleShelf ? undefined : shelf)

  const [locked, setLocked] = useState(false)
  const [visibleModal, setVisibleModal] = useState<ModalType | undefined>()
  const [modalAttrs, setModalAttrs] = useState<any>()
  const toggleModal = (modal?: ModalType) => setVisibleModal(modal === visibleModal ? undefined : modal)
  const setVisibleModalWithAttrs = (modalType: ModalType, options: any) => {
    setVisibleModal(modalType)
    setModalAttrs(options)
  }

  return (
    <LayoutContext.Provider
      value={{
        visibleShelf,
        setVisibleShelf,
        toggleShelf,
        visibleModal,
        setVisibleModal,
        toggleModal,
        setVisibleModalWithAttrs,
        modalAttrs,
        locked,
        setLocked,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
