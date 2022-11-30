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
    Intercom: object
    location: string
  }

  type UserBundle = {
    publicAddress: string
    email: string
  }

  type NextJsInitializedPage = (props: AppProps) => JSX.Element

  type HeaderShelfType = 'session' | 'howItWorks' | 'donate'

  type ModalType = 'postDonationData' | 'share' | 'alert' | 'media'

  type DonationStage =
    | 'setAmount'
    | 'login'
    | 'paymentFiat'
    | 'paymentCryptoPick'
    | 'paymentCryptoConnect'
    | 'paymentFiatAddress'
    | 'processCrypto'
    | 'confirmation'

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

  type NewUserData = { firstName?: string; lastName?: string }
}

export {}
