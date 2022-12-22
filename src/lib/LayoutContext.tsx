import { createContext, useEffect, useState } from 'react'
import { isServer } from '@lib'

export type DonationStatus = 'initiated' | 'processing' | 'completed' | ''

interface ILayoutContext {
  donationStatus?: DonationStatus
  setDonationStatus?: (status: DonationStatus) => void
  visibleShelf?: HeaderShelfType
  setVisibleShelf?: (shelf: HeaderShelfType) => void
  toggleShelf?: (shelf?: HeaderShelfType) => void
  visibleModal?: ModalType
  setVisibleModal?: (modal: ModalType) => void
  toggleModal?: (modal?: ModalType) => void
  setVisibleModalWithAttrs?: (modalType: ModalType, options: any) => void
  modalAttrs?: any
  locked?: boolean
  setLocked?: (b: boolean) => void
}

export const LayoutContext = createContext<ILayoutContext>({})

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

  useEffect(() => {
    /* Lock the page scroll if a shelf is open
     *  Note that the "correct" way to do this would be <body scrollLock={true} /> or something.
     *  Alas, body is outside the React context, so the only way to do this is via query selectors.
     */
    if (isServer()) return
    const docBody = document.getElementsByTagName('body')?.[0]
    if (!!visibleShelf) {
      docBody.classList.add('scrollLock')
    } else {
      docBody.classList.remove('scrollLock')
    }
  }, [visibleShelf])

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
