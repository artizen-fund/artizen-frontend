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

  type ModalType = 'createProfile' | 'share' | 'alert' | 'media' | 'login'

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

  type Grant = {
    __typename?: 'Grants'
    id: any
    date: any
    status: string
    blockchainId?: string | null
    goal?: number | null
    closingDate?: any | null
    season?: number | null
    submission?: {
      __typename?: 'Submissions'
      id: any
      artifacts: Array<{
        __typename?: 'Artifacts'
        id: any
        artworkPatron?: string | null
        artworkCreator?: string | null
        artworkCommunity?: string | null
      }>
      project?: {
        __typename?: 'Projects'
        id: any
        impact?: string | null
        longline?: string | null
        description?: string | null
        title?: string | null
        members: Array<{
          __typename?: 'ProjectMembers'
          id: any
          type: string
          user?: {
            __typename?: 'Users'
            id: any
            firstName?: string | null
            lastName?: string | null
            artizenHandle?: string | null
            profileImage?: string | null
          } | null
        }>
      } | null
    } | null
    donations: Array<{
      __typename?: 'Donations'
      amount: number
      user?: { __typename?: 'Users'; id: any; profileImage?: string | null; artizenHandle?: string | null } | null
    }>
  }

  interface IAlternatingPanel {
    image: string
    imageDark?: string
    title: string
    copy: string
    list: Array<{
      label: string
      glyph: keyof GlyphKey
    }>
    imageOnRight?: boolean
    destination?: string
    buttonLabel?: string
    children?: React.ReactElement
  }
}

export {}
