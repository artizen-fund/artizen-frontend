import { SDKBase, InstanceWithExtensions } from '@magic-sdk/provider'
import { OAuthExtension } from '@magic-ext/oauth'

declare global {
  interface SimpleComponentProps {
    children?: React.ReadNode
    className?: string
    onClick?: (input?: any) => void
  }

  type NextJsInitializedPage = (props: AppProps) => JSX.Element

  type TokenAndMetadataBundle = {
    token: string
    metadata: MagicUserMetadata
  }

  type MagicInstance = InstanceWithExtensions<SDKBase, OAuthExtension[]>
}

export {}
