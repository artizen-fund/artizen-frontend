import { SDKBase, InstanceWithExtensions } from '@magic-sdk/provider'
import { OAuthExtension } from '@magic-ext/oauth'

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

  type DonationStage = 'setAmount' | 'login' | 'payment' | 'processCrypto' | 'confirmation'

  type DonationMethod = 'usd' | 'polygon' | 'ethereum'
}

export {}
