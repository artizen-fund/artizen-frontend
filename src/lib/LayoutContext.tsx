import { createContext, useEffect, useState, useContext } from 'react'
import { UserContext, isServer } from '@lib'

/* TODO: rename this
 *  candidates:
 *    - uiContext
 *    - layoutContext
 *    - siteLayoutContext
 */

export type DonationStatus = 'initiated' | 'processing' | 'completed' | ''

interface ILayoutContext {
  donationStatus?: DonationStatus
  setDonationStatus?: (status: DonationStatus) => void
  donationStage: DonationStage
  setDonationStage?: (stage: DonationStage) => void
  visibleShelf?: HeaderShelfType
  setVisibleShelf?: (shelf: HeaderShelfType) => void
  toggleShelf?: (shelf?: HeaderShelfType) => void
  visibleModal?: ModalType
  setVisibleModal?: (modal: ModalType) => void
  toggleModal?: (modal?: ModalType) => void
  setVisibleModalWithAttrs?: (modalType: ModalType, options: any) => void
  modalAttrs?: any
  // TODO: modalAttrs?: MediaAttrs | whatever-else
}

export const LayoutContext = createContext<ILayoutContext>({ donationStage: 'setAmount' })

export const LayoutContextProvider = ({ children }: SimpleComponentProps) => {
  const { loggedInUser } = useContext(UserContext)

  const [donationStatus, setDonationStatus] = useState<DonationStatus>('')
  const [donationStage, setDonationStage] = useState<DonationStage>('setAmount')

  const [visibleShelf, setVisibleShelf] = useState<HeaderShelfType>()
  const toggleShelf = (shelf?: HeaderShelfType) => setVisibleShelf(shelf === visibleShelf ? undefined : shelf)

  const [visibleModal, setVisibleModal] = useState<ModalType | undefined>()
  const [modalAttrs, setModalAttrs] = useState<any>()
  const toggleModal = (modal?: ModalType) => setVisibleModal(modal === visibleModal ? undefined : modal)
  const setVisibleModalWithAttrs = (modalType: ModalType, options: any) => {
    setVisibleModal(modalType)
    setModalAttrs(options)
  }

  useEffect(() => {
    /* A donation can be initiated before a user is logged in.
     * This effect initiates the login UI, and then returns the UI to the donation flow.
     */
    if (donationStage === 'login') {
      /* ^ If a donation amount is set but no user is logged in, the donationStage will be set to 'login'. */
      if (visibleShelf === 'donate' && !loggedInUser) {
        /* ^ No user? Switch visible header shelf to session for Login/Signup UI. */
        setVisibleShelf('session')
      } else if (visibleShelf === 'session' && !!loggedInUser) {
        /* ^ Once the user is not undefined, flip back to Donation flow. */
        setDonationStage?.('paymentFiatAddress')
        setVisibleShelf('donate')
      }
    }
  }, [donationStage, loggedInUser, visibleShelf])

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
        donationStatus,
        setDonationStatus,
        donationStage,
        setDonationStage,
        visibleShelf,
        setVisibleShelf,
        toggleShelf,
        visibleModal,
        setVisibleModal,
        toggleModal,
        setVisibleModalWithAttrs,
        modalAttrs,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
