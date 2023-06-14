import { BigNumber } from 'bignumber.js'
import { IUsers } from './generated'

declare global {
  interface SimpleComponentProps {
    id?: string
    children?: React.ReadNode
    className?: string
    onClick?: (input?: any) => void
  }

  interface Window {
    Intercom: {
      name?: string
    }
    location: string
  }

  type UserBundle = {
    publicAddress: string
    email: string
  }

  type NextJsInitializedPage = (props: AppProps) => JSX.Element

  type HeaderShelfType = 'session' | 'howItWorks' | 'donate'

  type ModalType =
    | 'createProfile'
    | 'share'
    | 'alert'
    | 'media'
    | 'login'
    | 'confirmTransaction'
    | 'processTransaction'
    | 'shareTransaction'
    | 'createSeasonModal'
    | 'submitProjectModal'
    | 'newProjectMemberModal'
    | 'errorModal'
    | 'sponsorModal'
    | 'matchFundsModal'

  type DonationMethod = 'usd' | 'polygon' | 'ethereum'

  type Donation = {
    address: string
    amount: string
    block_hash: string
    user: IUsers
    userAddress: string
  }

  type DonationStageStatus = 'WAITING' | 'PROCESSING' | 'COMPLETE'

  type DonationStageFunction = (setStatus: (s: StageStatus) => void, setMessage: (s: string) => void) => void

  type IRaffle = {
    cancelled: boolean
    ended: boolean
    donationCount: BigNumber
    endTime: BigNumber
    startTime: BigNumber
    minimumDonationAmount: BigNumber
    nftContract: string
    nftOwner: string
    raffleID: BigNumber
    tokenAllocation: BigNumber
    tokenBuffer: BigNumber
    tokenID: BigNumber
    topDonatedAmount: BigNumber
    topDonor: string
  }

  interface IAlternatingPanel {
    image: string
    imageDark?: string
    title: string
    copy: string
    list: Array<{
      label: string
      glyph: string
    }>
    imageOnRight?: boolean
    destination?: string
    buttonLabel?: string
    children?: React.ReactElement
  }

  interface ICourierAPI {
    email: string
    id: string
    artizenHandle: string
    type: 'updateUser' | 'addNewUser'
  }
}

export {}
