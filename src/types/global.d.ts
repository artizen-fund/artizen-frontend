import { SDKBase, InstanceWithExtensions } from '@magic-sdk/provider'
import { OAuthExtension } from '@magic-ext/oauth'
import { BigNumber } from 'bignumber.js'
import { IUser } from './generated'

declare global {
  interface SimpleComponentProps {
    children?: React.ReadNode
    className?: string
    onClick?: (input?: any) => void
  }

  interface Window {
    Intercom: object
  }

  type NextJsInitializedPage = (props: AppProps) => JSX.Element

  type TokenAndMetadataBundle = {
    token: string
    metadata: MagicUserMetadata
  }

  type MagicInstance = InstanceWithExtensions<SDKBase, OAuthExtension[]>

  type HeaderShelfType = 'session' | 'howItWorks' | 'donate'

  type ModalType = 'donationGuide' | 'PostDonationData'

  type DonationStage = 'setAmount' | 'login' | 'payment' | 'paymentFiatAddress' | 'processCrypto' | 'confirmation'

  type DonationMethod = 'usd' | 'polygon' | 'ethereum'

  type Donation = {
    address: string
    amount: string
    block_hash: string
    user: IUser
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
