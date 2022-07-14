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
}

export {}
